let mongoose = require('mongoose');

let dish_schema = mongoose.Schema({
    name: {type: String, unique: true},
    produced: Number,
    description: String,
    predicted: Number,
    price: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('Dish', dish_schema);
