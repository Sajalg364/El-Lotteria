const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    grid: { type: [[Number]], required: true },
    markedGrid: { type: [[Boolean]], default: Array(3).fill(Array(3).fill(false)) },
});

module.exports = mongoose.model('User', userSchema);
