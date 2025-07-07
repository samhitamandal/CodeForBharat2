from fastapi import FastAPI, File, UploadFile
from fastapi import APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pytesseract
import cv2
import numpy as np
import re
from bson import ObjectId
from pymongo import MongoClient
from fastapi.responses import JSONResponse
app = FastAPI()

from google import genai
client = genai.Client(api_key="AIzaSyAQb_mQXFssy1wQzJ0v81iQu2k03ylc-FU")

mongo_client = MongoClient("mongodb+srv://admin:Nikhil%402005@cluster0.bvqowwk.mongodb.net/myDatabase?retryWrites=true&w=majority")
db = mongo_client["myDatabase"]
collection = db["Medicines"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace * with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_medicine_names(raw_line: str) -> List[str]:
    # Remove contents in parentheses
    line = re.sub(r'\(.*?\)', '', raw_line)

    # Split using '+' sign or comma
    components = re.split(r'\+|,', line)

    clean_names = []
    for comp in components:
        # Remove digits and units (mg, ml, etc.)
        name = re.sub(r'\b\d+\.?\d*\s*(mg|ml|mcg|g|units)?\b', '', comp, flags=re.IGNORECASE)
        name = re.sub(r'\s+', ' ', name).strip()  # Normalize whitespace
        if name:
            clean_names.append(name.title())  # Optional: capitalize properly
    return clean_names

def clean_prescription_text(raw_text: str) -> str:
    lines = raw_text.split('\n')
    cleaned_lines = []
    medicine_section = False
    for line in lines:
        line = line.strip()
        # Detect start of medicine section by keywords
        if re.search(r'\b(Medicine|Rx|TAB\.|CAP\.|SYP\.)\b', line, re.IGNORECASE):
            medicine_section = True
        if medicine_section:
            # Normalize common patterns
            line = re.sub(r'\b(Morning|Night|Aft|Eve)\b', lambda m: m.group(0).capitalize(), line, flags=re.IGNORECASE)
            line = re.sub(r'(Before|After)\s+Food', lambda m: m.group(0).lower(), line, flags=re.IGNORECASE)
            line = re.sub(r'\s+', ' ', line)  # Remove extra spaces
            line = re.sub(r'\(Tot:(.*?)\)', '', line)  # Remove total pills info (optional)
        cleaned_lines.append(line)
    # Join everything back
    cleaned_text = '\n'.join(cleaned_lines)
    # Add basic formatting if needed
    cleaned_text = re.sub(r'\s*\|\s*', '\n', cleaned_text)  # Split pipe-separated metadata
    cleaned_text = re.sub(r'(\d+\))', r'\n\1', cleaned_text)  # Ensure medicines start on a new line
    return cleaned_text.strip()



def preprocess_image(image_bytes: bytes) -> np.ndarray:
    # Convert bytes to numpy array
    np_arr = np.frombuffer(image_bytes, np.uint8)
    # Decode image from numpy array
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Failed to decode image from bytes.")   
    # Resize, grayscale, etc. if needed
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return gray



def extract_text_from_image(image_path):
    preprocessed_image = preprocess_image(image_path)   
    # Use Tesseract to extract text
    extracted_text = pytesseract.image_to_string(preprocessed_image)
    return extracted_text

def get_medicine_info(medicine_name: str) -> str:
    prompt = (
        f"Provide a short medical description of the medicine '{medicine_name}', "
        "including its usage and side effects. Keep it concise and simple.No need to add a disclaimer like Important Note."
        "Remember provide markdown format response."
    )
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    return response.text

def validate_and_extract_medicines(text: str) -> dict:
    prompt = (
        "Extract medicine names from the following prescription text.\n"
        "Return them in Markdown format as a bulleted list using dashes (-). "
        "Each medicine name should be on a new line, using sentence case.\n\n"
        f"Prescription Text:\n{text}"
    )

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    return response.text


def check_inventory(medicine_name: str) -> dict:
    """Query MongoDB for inventory details of a given medicine."""
    doc = collection.find_one({"med_name": medicine_name})
    if doc:
        return {
            "available": doc.get("med_quantity", 0) > 0,  # 👈 change here
            "stock": doc.get("med_quantity", "N/A")
        }
    else:
        return {"price": "N/A"}



class Message(BaseModel):
    user_input: str

@app.post("/chat")
async def chat(message: Message):
    user_text = message.user_input
    prompt = (
        "Be the friendliest chat bot and respond to the customers query but keep in mind to give a concise answer. \n"
        "Give a short summary answer."
        f"Prescription Text:\n{user_text}"
    )
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    reply_text = response.text 
    return {"reply": reply_text}

@app.post("/extract_text/")
async def extract_text(file: UploadFile = File(...)):
    contents = await file.read()
    raw_text = extract_text_from_image(contents)
    cleaned_text = clean_prescription_text(raw_text)
    
    return {"extracted_text": cleaned_text}


@app.post("/validate_prescription/")
async def validate_prescription(data: dict):
    text = data.get("text", "")
    response_text = validate_and_extract_medicines(text)

    # Clean Markdown bullet list (starting with `-`)
    medicine_names = [
        line.lstrip("- ").strip()
        for line in response_text.split("\n")
        if line.strip().startswith("-")
    ]
    cleaned_names = []
    for name in medicine_names:
        cleaned_names.extend(extract_medicine_names(name))

    # Remove duplicates
    cleaned_names = list(set(cleaned_names))
# For each medicine, get Gemini description and inventory details from MongoDB
    details = {}
    available_meds=[]
    for med in cleaned_names:
        description = get_medicine_info(med)
        #inventory = check_inventory(med)
        inventory_doc = collection.find_one({"med_name": med})
        inventory={}
        if inventory_doc:
            med_quantity = inventory_doc.get("med_quantity", 0)
            inventory = {
                "available": med_quantity > 0,
                "stock": med_quantity,
            }

            if inventory["available"]:
                available_meds.append({
                    "medId": str(inventory_doc["_id"]),
                    "med_name": med,
                    "med_price":inventory_doc["med_price"]
                })
        else:
            inventory = {"available": False, "stock": 0}

        details[med] = {
        "description": description,
        "inventory": inventory
    }
    print("✅ Sending to frontend:", {
    "validated": response_text,
    "details": details,
    "available": available_meds
    })
    return JSONResponse(content={
        "validated": response_text,
        "details": details,
        "available": available_meds
    })


@app.post("/medicine_info/")
async def medicine_info(data: dict):
    medicines: List[str] = data.get("medicines", [])
    info = {med: get_medicine_info(med) for med in medicines}
    return {"medicine_info": info}

@app.get("/test-db/")
async def test_db():
    # Fetch a few documents (limit to 10) from the Medicines collection
    docs = list(collection.find().limit(100))
    # Convert ObjectIDs to strings for JSON serialization
    for doc in docs:
        doc['_id'] = str(doc['_id'])
    return {"documents": docs}