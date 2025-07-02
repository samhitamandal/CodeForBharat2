import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar"; // ✅ Sidebar import
import "./shop.css";

const Shop = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/medicines")
      .then((res) => res.json())
      .then((data) => {
        setMedicines(data);
        setFiltered(data);
      });
  }, []);

  const handleAddToCart = async (med) => {
    const userId = localStorage.getItem('userId'); // get userId however you store it
  
    const res = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        medId: med._id,
        med_name: med.med_name,
        quantity: 1,
        price: med.med_price
      })
    });
  
    const data = await res.json();
    console.log("Added to cart:", data);
  };


  const handleSearch = () => {
    const result = medicines.filter((med) =>
      med.med_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (result.length === 0) {
      navigate("/requestmedicine");
    } else {
      setFiltered(result);
    }
  };

  return (
    <div className="shop-layout">
      <Sidebar />
      <div className="shop-container">
        <div className="shop-header">
          <input
            type="text"
            placeholder="Search for a medicine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="search-btn">
            🔍 Search
          </button>
          <button onClick={() => navigate("/cart")} className="cart-btn">
            🛒 Cart
          </button>
        </div>

        <div className="medicine-grid">
          {filtered.map((med, index) => (
            <div className="medicine-card" key={index}>
              <div>
                <div className="medicine-title">{med.med_name}</div>
                <div className="medicine-info">
                  Side effects: {med.side_effects}
                </div>
                <div className="medicine-info">
                  Available:{" "}
                  {med.med_quantity > 0 ? med.med_quantity : "Sold Out"}
                </div>
              </div>
              <div className="medicine-footer">
                <span className="price">₹{med.med_price}</span>
                {med.med_quantity > 0 ? (
                  <button className="add-btn" onClick={() => handleAddToCart(med)}>
                  Add to Cart
                </button>
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => navigate("/requestmedicine")}
                  >
                    Request It
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
