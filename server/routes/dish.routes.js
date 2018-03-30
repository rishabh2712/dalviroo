module.exports = function(app) {

    let dishes = require('../controllers/dish.controller.js')
    let orders = require('../controllers/order.controller.js')

    // Create a new dish
    app.post('/api/dishes', dishes.create)
    // Retrieve all dishes
    app.get('/api/dishes', dishes.findAll)

    app.get('/api/dishes/in_order', orders.findInOrder)

    app.get('/api/dishes/report', dishes.dishReport)

    app.get('/api/dishes/:dishId', dishes.findOne)
    // Update a dish with dishId
    app.put('/api/dishes/:dishId', dishes.dish_update)
    // Delete a dish with dishId
    app.delete('/api/dishes/:dishId', dishes.delete)
    // Retrieve a single dish with dishId
    app.post('/api/dishes/:dishId/order', orders.dish_order)
      //update after have been completed
    app.put('/api/dishes/:dishId/order_update', orders.dish_order_update)


}
