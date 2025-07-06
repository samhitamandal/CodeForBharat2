import React, { useState } from "react";
import "./AddMedicineForm.css";
import Sidebar from "../components/sidebar";

const AdminInventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    quantity: "",
    expiry: "",
    price: "",
    prescriptionRequired: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Medicine Data:", formData);
    alert("Medicine added to inventory!");
    // Here you would send data to backend
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="medicine-form-container">
        <h2>Add Medicine to Inventory</h2>
        <form onSubmit={handleSubmit} className="medicine-form">
          <label>Medicine Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Dosage (e.g. 500mg)</label>
          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            required
          />

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <label>Expiry Date</label>
          <input
            type="date"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            required
          />

          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="prescriptionRequired"
              checked={formData.prescriptionRequired}
              onChange={handleChange}
            />
            Prescription Required
          </label>

          <label>Upload Image (optional)</label>
          <input type="file" name="image" onChange={handleChange} />

          <button type="submit" className="submit-btn">
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminInventory;
