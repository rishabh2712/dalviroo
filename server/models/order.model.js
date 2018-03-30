let mongoose = require('mongoose');

let dish_schema = mongoose.Schema({
    name: {type: String, unique: true},
    produced: Number,
    description: String,
    predicted: Number,
    price: Number
})

let order = mongoose.Schema({
  dish: dish_schema,
  quantity: {type: Number, required:true},
  status: {type: String, required: true}
})
module.exports = mongoose.model('Order', order);
