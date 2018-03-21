# dalviroo

## Technology stack

* **Nodejs**
* **MongoDB**
* **ReactJs**

## Api Documentation

### Create a new Dish

```sh
POST /dishes
```
```javascript
 {
	"name" :"Dish-6",
	"created_till_now": 2,
	"predicted": 112,
	"quantity_in_progress":"0"
}
```
### Order a dish

```sh
PUT /dishes/:id
```
	
```javascript
{
	"quantity_in_progress":"5"
}
```

### Complete an existing order
The value has to be same as the order, otherwise the order wont complete.


```sh
PUT /dishes/:id/order_done
```
	
```javascript
{
	"quantity_in_progress":"5"
}
```
### Get the list of dishes in order pipeline
This api will give you all the dishes currentlt in order and will be shown on the list in UI

```sh
GET /dishes/in_order
```

### Setting up Predicted values for each dish

```sh
PUT /dishes/:id
```
	
```javascript
{ 
 "predicted":"5"
}
```
