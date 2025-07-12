import React, { useState } from "react";
import "./ShowPrescriptions.css";
import imagePlaceholder from "../assets/image.png";

const ShowPrescriptions = () => {
  // Dummy Data (Replace with API call later)
  const prescriptions = [
    {
      id: 1,
      image: imagePlaceholder, // Replace with backend URL
      text: "Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication.",
      date: "2024-04-04",
    },
    {
      id: 2,
      image: imagePlaceholder, // Replace with backend URL
      text: "Apply ointment twice a day for 7 days. Keep the area clean and dry before applying the medication.",
      date: "2024-04-02",
    },
    {
      id: 3,
      image: imagePlaceholder, // Replace with backend URL
      text: "Take one tablet of Paracetamol every 6 hours. Drink plenty of water and avoid alcohol while taking this medication. Make sure to rest properly and do not exceed the recommended dose.",
      date: "2024-04-04",
    },
  ];

  return (
    <div className="show-prescriptions-container">
      <h2>Your Uploaded Prescriptions</h2>
      <div className="prescriptions-list">
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <div key={prescription.id} className="prescription-card">
              <img
                src={prescription.image}
                alt="Prescription"
                className="prescription-image"
              />
              <div className="prescription-text-container">
                <p className="prescription-text">{prescription.text}</p>
                <p className="prescription-date">{prescription.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No prescriptions found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowPrescriptions;
