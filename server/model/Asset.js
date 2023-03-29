// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema } = mongoose;

const assetSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cash: {
        type: Number,
        required: true
    },
    savings: {
        type: Number,
        required: true
    },
    bank: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Asset", assetSchema);

// email: jofysot@mailinator.com
// pass: jofysot@mailinator.com