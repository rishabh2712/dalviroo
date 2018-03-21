module.exports = function(app) {

    var dishes = require('../controllers/dish.controller.js')

    // Create a new dish
    app.post('/dishes', dishes.create)

    // Retrieve all dishes
    app.get('/dishes', dishes.findAll)

    app.get('/dishes/in_order', dishes.findInOrder)

    app.get('/dishes/report', dishes.dishReport)
    // Retrieve a single dish with dishId
    app.get('/dishes/:dishId', dishes.findOne)

    // Update a dish with dishId
    app.put('/dishes/:dishId', dishes.dish_update)

    // Delete a dish with dishId
    app.delete('/dishes/:dishId', dishes.delete)

    app.put('/dishes/:dishId/order_done', dishes.dish_created_till_now)

}
