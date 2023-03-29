// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    isactive: {
        type: String,
        required: false,
        default: '0'
    },
    categories: {
        type: Array,
        required: false,
        default: ['Food', 'Fuel', 'Bills', 'Loan', 'Installments', 'Grocery', 'Shopping', 'Transport', 'Medical', 'Rent', 'Family', 'Gifts'],
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

// email: jofysot@mailinator.com
// pass: jofysot@mailinator.com