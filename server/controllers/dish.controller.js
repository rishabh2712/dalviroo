var Dish = require('../models/dish.model.js')
const json2csv = require('json2csv').Parser

exports.create = function(req, res) {
    // Create and Save a new Dish
    console.log(req.body)
    if(!req.body.name) {
        return res.status(400).send({message: "Dish can not be empty"});
    } else if (!req.body.description) {
      return res.status(400).send({message: "Dish can not be with empty description"});
    } else if (!req.body.description) {
      return res.status(400).send({message: "Dish can not be free"});
    }
       var dish = new Dish({name: req.body.name,
         created_till_now: req.body.created_till_now != undefined ?  req.body.created_till_now : 0,
         predicted: req.body.predicted != undefined ?  req.body.predicted : 0,
         description: req.body.description,
         price: req.body.price,
         quantity_in_progress: req.body.quantity_in_progress != undefined ?  req.body.quantity_in_progress : 0,
       });

       dish.save(function(err, data) {
           if(err) {
               console.log(err);
               res.status(500).send({message: "Some error occurred while creating the dish."});
           } else {
               res.send(data);
           }
       });
};

exports.findAll = function(req, res) {
  Dish.find(function(err, dishes){
      if(err) {
          console.log(err);
          res.status(500).send({message: "Some error occurred while retrieving dishes."});
      } else {
          res.send(dishes)
      }
  })
}

exports.findOne = function(req, res) {
    // Find a single dish with a dishId
  Dish.findById(req.params.dishId, function(err, dish) {
          if(err) {
              console.log(err);
              if(err.kind === 'ObjectId') {
                  return res.status(404).send({message: "dish not found with id " + req.params.dishId});
              }
              return res.status(500).send({message: "Error retrieving dish with id " + req.params.dishId});
          }

          if(!dish) {
              return res.status(404).send({message: "dish not found with id " + req.params.dishId});
          }

          res.send(dish)
      })
}

exports.findInOrder =  function(req, res) {
  Dish.find({quantity_in_progress : { $gte: 1 }}, function(err, dish) {
          if(err) {
              console.log(err);
              if(err.kind === 'ObjectId') {
                  return res.status(404).send({message: "dish not found with id " + req.params.dishId});
              }
              return res.status(500).send({message: "Error retrieving dish with id " + req.params.dishId});
          }

          if(!dish) {
              return res.status(404).send({message: "dish not found with id " + req.params.dishId});
          }

          res.send(dish)
      })
}

exports.delete = function(req, res) {
    // Delete a dish with the specified dishId in the request
    Dish.findByIdAndRemove(req.params.dishId, function(err, dish) {
            if(err) {
                console.log(err);
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "dish not found with id " + req.params.dishId})
                }
                return res.status(500).send({message: "Could not delete dish with id " + req.params.dishId})
            }

            if(!dish) {
                return res.status(404).send({message: "dish not found with id " + req.params.dishId})
            }

            res.send({message: "dish deleted successfully!"})
        })
}

exports.dish_update = function(req, res) {
  Dish.findById(req.params.dishId, function(err, dish) {
          console.log(req.params)
          if(err) {
              console.log(err)
              if(err.kind === 'ObjectId') {
                  return res.status(404).send({message: "dish not found with id " + req.params.dishId})
              }
              return res.status(500).send({message: "Error finding dish with id " + req.params.dishId})
          }

          if(!dish) {
              return res.status(404).send({message: "dish not found with id " + req.params.dishId})
          }
          dish.name = req.body.hasOwnProperty('name') ? req.body.name : dish.name
          dish.predicted = req.body.hasOwnProperty('predicted') ? req.body.predicted : dish.predicted
          dish.created_till_now = req.body.hasOwnProperty('created_till_now') ? req.body.created_till_now : dish.created_till_now
          dish.quantity_in_progress = req.body.hasOwnProperty('quantity_in_progress') ? req.body.quantity_in_progress : dish.quantity_in_progress
          dish.description = req.body.hasOwnProperty('description') ? req.body.description : dish.description
          dish.price = req.body.hasOwnProperty('price') ? req.body.price : dish.price
          dish.save(function(err, data){
              if(err) {
                  res.status(500).send({message: "Could not update dish with id " + req.params.dishId})
              } else {
                  res.send(data)
              }
          })
      })
}



exports.dish_created_till_now = function(req, res) {
  Dish.findById(req.params.dishId, function(err, dish) {
          if(err) {
              if(err.kind === 'ObjectId') {
                  return res.status(404).send({message: "dish not found with id " + req.params.dishId})
              }
              return res.status(500).send({message: "Error finding dish with id " + req.params.dishId})
          }

          if(!dish) {
              return res.status(404).send({message: "dish not found with id " + req.params.dishId})
          }
          if(dish.quantity_in_progress != req.body.order_quantity_complete ) {
            return res.status(422).send({message: "dish not ordered "})
          }

          dish.created_till_now = dish.created_till_now + req.body.order_quantity_complete
          dish.quantity_in_progress = dish.quantity_in_progress - req.body.order_quantity_complete
          dish.save(function(err, data){
              if(err) {
                  res.status(500).send({message: "Could not update dish with id " + req.params.dishId})
              } else {
                  res.send(data)
              }
          })
      })
}

exports.dishReport = function(req, res) {
  Dish.find(function(err, dishes){
      if(err) {
          console.log(err)
          return res.status(500).send({message: "Some error occurred while retrieving dishes."})
      } else {
        const fields = new json2csv(['name', 'produced'])
        const csv = fields.parse(dishes.map(dish => Object.assign({},{name: dish.name, produced: dish.created_till_now})))
        res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
        res.set('Content-Type', 'text/csv')
        return res.status(200).send(csv)
      }
  })
}
