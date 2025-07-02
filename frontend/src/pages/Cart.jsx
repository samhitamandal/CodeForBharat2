import "./Cart.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/cart/${userId}`)
        .then((res) => res.json())
        .then((data) => setCart(data.items || []));
    }, [userId]);

    useEffect(() => {
        const totalCost = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,0);
        setTotal(totalCost);
    }, [cart]);

    const updateQuantity = (medId, action) => {
        fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, medId, action }),
        })
        .then((res) => res.json())
        .then((data) => setCart(data.items));
    };

    const removeItem = (medId) => {
        fetch("http://localhost:5000/api/cart/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, medId }),
        })
        .then((res) => res.json())
        .then((data) => setCart(data.items));
    };

    const handleCheckout = async () => {
        try {
        setLoading(true);

        // Create line items from cart items
        const lineItems = cart.map((item) => ({
            price_data: {
            currency: "inr", // Using INR as your prices show ₹
            product_data: {
                name: item.med_name,
            },
            unit_amount: Math.round(item.price * 100), // Stripe expects amount in smallest currency unit (paise)
            },
            quantity: item.quantity,
        }));

        // Create checkout session
        const res = await axios.post(
            "http://localhost:5000/api/stripe/create-checkout-session",
            {
            lineItems,
            userId,
            }
        );

        const sessionId = res.data.id;

        // Load Stripe and redirect to checkout
        const stripe = await window.Stripe(
            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        await stripe.redirectToCheckout({ sessionId });
        } catch (err) {
        console.error("Error during checkout:", err);
        setLoading(false);
        alert("An error occurred during checkout. Please try again.");
        }
    };

    return (
        <div className="cart-container">
        <Sidebar />
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <>
            {cart.map((item) => (
                <div key={item.medId} className="cart-item">
                <div>{item.med_name}</div>
                <div>₹{item.price}</div>
                <div>
                    <button
                    onClick={() => updateQuantity(item.medId, "decrement")}
                    disabled={loading}
                    >
                    -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                    onClick={() => updateQuantity(item.medId, "increment")}
                    disabled={loading}
                    >
                    +
                    </button>
                </div>
                <div>
                    <button
                    onClick={() => removeItem(item.medId)}
                    disabled={loading}
                    >
                    🗑
                    </button>
                </div>
                </div>
            ))}
            <h3>Total: ₹{total}</h3>
            <button
                className="proceed-btn"
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
            >
                {loading ? "Processing..." : "Proceed to Payment"}
            </button>
            </>
        )}
        </div>
    );
};

export default Cart;