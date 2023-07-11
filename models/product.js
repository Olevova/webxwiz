const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
         required: true
    }
}, { timestamps: true })

const Product = model('Product', ProductSchema);
module.exports = Product