let Order = require('../models/order.model.js')
let Dish = require('../models/dish.model.js')

exports.findInOrder =  function(req, res) {
  Order.find({status: "active"})
     .populate('dish')
     .exec(function (err, orders) {
      if (err) return res.status(500).send(err)
      return res.status(200).send(orders)
  })
}


exports.dish_order = function(req, res) {
  if(!req.body.quantity || req.body.quantity<=0) {
      return res.status(400).send({message: "Order has to be complete"})
  }
  Dish.findById(req.params.dishId)
  .then(dish => {
    if(!dish) {
      return res.status(404).send({message: "Dish not found"})
    }
    let order = new Order({
      dish: dish._id,
      quantity: req.body.quantity,
      status: "active"
    })
    order.save(function(err, data) {
      if(err) {
        console.log(err)
        return res.status(500).send({message: "Some error occurred while creating the dish."});
      } else {
        return res.status(200).send(data);
      }
    })
  })
  .catch(err => {
    if(err.kind === 'ObjectId') {
     return res.status(404).send({message: "dish not found with id " + req.params.dishId})
    }
  })
}

exports.dish_order_update = function(req, res) {
  Dish.findById(req.params.dishId, function(err, dish) {
      if(err) {
        if(err.kind === 'ObjectId') {
         return res.status(404).send({message: "Order not found with id " + req.params.dishId})
        }
        return res.status(500).send({message: "Error finding dish with id " + req.params.dishId})
      }
      if(!req.body.order_id) {
        return res.status(404).send({message: "Order id has to be present"})
      }
      Order.findById(req.body.order_id)
      .then(order => {
      order.status = "closed"
      order.save(function(err, data){
          if(err) {
              res.status(500).send({message: "Could not update dish with id " + req.params.dishId})
          } else {
              res.send(data)
          }
      })
      dish.produced = dish.produced +  order.quantity
      dish.save()
    })
  })
}
