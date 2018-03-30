let Order = require('../models/order.model.js')
let Dish = require('../models/dish.model.js')

exports.findInOrder =  function(req, res) {
  Order.find({status : "active"}, function(err, orders) {
          if(err) {
              if(err.kind === 'ObjectId') {
                  return res.status(404).send({message: "dish not found with id " + req.params.dishId});
              }
              return res.status(500).send({message: "Error retrieving dish with id " + req.params.dishId});
          }

          if(!orders) {
              return res.status(404).send({message: "dish not found with id " + req.params.dishId});
          }

          res.send(orders)
      })
}


exports.dish_order = function(req, res) {
  if(!req.body.quantity || req.body.quantity<=0) {
      return res.status(400).send({message: "Order has to be complete"});
  }
  Dish.findById(req.params.dishId)
  .then(dish => {
    var order = new Order({
      dish: dish,
      quantity: req.body.quantity,
      status: "active"
    })
    order.save(function(err, data) {
      if(err) {
          console.log(err);
          res.status(500).send({message: "Some error occurred while creating the dish."});
      } else {
          res.send(data);
      }
    })

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
            //Increase produced count in dishes
            dish.produced = dish.produced +  order.quantity
            dish.save()
          })
      })
}
