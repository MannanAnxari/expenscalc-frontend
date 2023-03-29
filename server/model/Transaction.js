// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema } = mongoose;

const transaction = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paid_from: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transaction);

// email: jofysot@mailinator.com
// pass: jofysot@mailinator.com