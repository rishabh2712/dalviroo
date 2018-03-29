module.exports = function(app) {

    var dishes = require('../controllers/dish.controller.js')

    // Create a new dish
    app.post('/api/dishes', dishes.create)

    // Retrieve all dishes
    app.get('/api/dishes', dishes.findAll)

    app.get('/api/dishes/in_order', dishes.findInOrder)

    app.get('/api/dishes/report', dishes.dishReport)
    // Retrieve a single dish with dishId
    app.get('/api/dishes/:dishId', dishes.findOne)

    // Update a dish with dishId
    app.put('/api/dishes/:dishId', dishes.dish_update)

    // Delete a dish with dishId
    app.delete('/api/dishes/:dishId', dishes.delete)

      //update after have been completed
    app.put('/api/dishes/:dishId/order_done', dishes.dish_created_till_now)


}
