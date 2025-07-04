const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

    // Add to Cart
    router.post('/add', async (req, res) => {
    const { userId, medId, med_name, quantity, price } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({
        userId,
        items: [{ medId, med_name, quantity, price }]
        });
    } else {
        const itemIndex = cart.items.findIndex((item) => item.medId.equals(medId));
        if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        } else {
        cart.items.push({ medId, med_name, quantity, price });
        }
    }

    await cart.save();
    res.json(cart);
    });

    // Get Cart
    router.get("/:userId", async (req, res) => {
        try {
            //const userId = JSON.parse(localStorage.getItem('userId'));
            const cart = await Cart.findOne({ userId : req.params.userId });
            res.json(cart || { items: [] });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
        });


    //Add to cart
    const Medicine = require('../models/Medicine'); // required to fetch price/name

    router.post("/add", async (req, res) => {
    const { userId, medId } = req.body;

    try {
        const medicine = await Medicine.findById(medId);

        if (!medicine) return res.status(404).json({ error: "Medicine not found" });

        let cart = await Cart.findOne({ userId });
        if (!cart) {
        cart = new Cart({
            userId,
            items: [{ medId, med_name: medicine.med_name, price: medicine.med_price, quantity: 1 }],
        });
        } else {
        const existingItem = cart.items.find(item => item.medId.toString() === medId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
            medId,
            med_name: medicine.med_name,
            price: medicine.med_price,
            quantity: 1,
            });
        }
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });
    
    //Update
    router.put("/update", async (req, res) => {
        const { userId, medId, action } = req.body;
        try {
            const cart = await Cart.findOne({ userId });
            const item = cart.items.find(i => i.medId.toString() === medId);
            if (!item) return res.status(404).json({ error: "Item not found" });
        
            if (action === "increment") item.quantity += 1;
            else if (action === "decrement" && item.quantity > 1) item.quantity -= 1;
        
            await cart.save();
            res.json(cart);
            } catch (err) {
            res.status(500).json({ error: err.message });
            }
        });
        
    
    //Delete
    router.delete("/delete", async (req, res) => {
        const { userId, medId } = req.body;
            try {
            const cart = await Cart.findOneAndUpdate(
                { userId },
                { $pull: { items: { medId } } },
                { new: true }
            );
            res.json(cart);
            } catch (err) {
            res.status(500).json({ error: err.message });
            }
        });
module.exports = router;
