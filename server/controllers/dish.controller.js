let Dish = require('../models/dish.model.js')

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
         produced: req.body.produced != undefined ?  req.body.produced : 0,
         predicted: req.body.predicted != undefined ?  req.body.predicted : 0,
         description: req.body.description,
         price: req.body.price
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

exports.dishReport = function(req, res) {
  Dish.find(function(err, dishes){
      if(err) {
          console.log(err)
          return res.status(500).send({message: "Some error occurred while retrieving dishes."})
      } else {
        const fields = new json2csv(['name', 'produced'])
        const csv = fields.parse(dishes.map(dish => Object.assign({},{name: dish.name, produced: dish.produced, predicted: dish.predicted})))
        res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
        res.set('Content-Type', 'text/csv')
        return res.status(200).send(csv)
      }
  })
}
