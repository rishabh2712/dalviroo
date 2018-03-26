let mongoose = require('mongoose');

let dish_schema = mongoose.Schema({
    name: {type: String, unique: true},
    created_till_now: Number,
    description: String,
    predicted: Number,
    quantity_in_progress: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Dish', dish_schema);
