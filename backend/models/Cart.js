const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    medId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicines' },
    med_name: String,
    quantity: Number,
    price: Number
});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
