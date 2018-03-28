import React, { Component } from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider'
import ListItem from '../../components/ListItem'
import OrderComponent from './OrderComponent'

const OrderSummary = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export default class CheckoutCart extends React.Component {
  constructor(props) {
   super(props)
   this.cart=[]
   this.state = {
     counter: 0,
   }
 }

 uniqObject(dishes) {
   let seen = {};
   return dishes.filter(function(dish) {
       return seen.hasOwnProperty(dish._id) ? false : (seen[dish._id] = true);
   }).map(dish => Object.assign({
     dish,
     counter: dishes.filter(dish1 => dish1._id === dish._id).length
   }))
 }

 render() {
   let cart = this.uniqObject(this.props.cart)
   return(
     <div>
      <div className="col-xs-12 col-sm-6 col-md-4">
        {cart.map(item =>
          <Card style={{margin: '10px 0px'}}>
              <CardHeader
                title={item.dish.name}
                subtitle={item.dish.description}
                actAsExpander={true}
              />
              <CardText>
                Quantity:
                <OrderComponent counter={item.counter} addToCart={this.props.addToCart} deleteFromCart={this.props.deleteFromCart} dish={item.dish}/>
              </CardText>
            </Card>
        )}
      </div>
        <Divider />
      <OrderSummary>
      </OrderSummary>
     </div>
    )
  }
}
