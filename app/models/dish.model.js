let mongoose = require('mongoose');

let dish_schema = mongoose.Schema({
    name: String,
    created_till_now: Number,
    predicted: Number,
    quantity_in_progress: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Dish', dish_schema);
