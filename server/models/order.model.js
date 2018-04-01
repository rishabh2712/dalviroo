let mongoose = require('mongoose')

let order = mongoose.Schema({
  dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
  quantity: {type: Number, required:true},
  status: {type: String, required: true}
})

module.exports = mongoose.model('Order', order);
