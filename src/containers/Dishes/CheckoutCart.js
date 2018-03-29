import React, { Component } from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider'
import ListItem from '../../components/ListItem'
import OrderComponent from './OrderComponent'
import FlexEnd from '../../components/FlexComponents/FlexEnd'


export default class CheckoutCart extends React.Component {
  constructor(props) {
   super(props)
   this.cart=[]
   this.state = {
     counter: 0
   }
 }
componentWillReceiveProps(nextProps) {
  if(nextProps.success) {
    this.props.handleClose()
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
   let bill = 0
   cart.forEach(item => {
     bill+= item.dish.price*item.counter
   })
   return(
     <div>
      <FlexEnd>
        {this.props.isRequesting ?  <CircularProgress /> : <div></div>}
      </FlexEnd>
      <div style={{
        display: 'flex',
        flexWrap:'wrap'
      }}>
        {cart.map((item, key) =>
        <Card style={{margin: '10px 10px'}} key={key}>
            <CardHeader
              title={item.dish.name}
              subtitle={item.dish.description}
              actAsExpander={true}
            />
            <CardText>
              Price: {item.dish.price}
            </CardText>
            <CardText>
              Quantity:
              <OrderComponent counter={item.counter} addToCart={this.props.addToCart} deleteFromCart={this.props.deleteFromCart} dish={item.dish}/>
            </CardText>
          </Card>
        )}
      </div>
        <Divider />
      <FlexEnd>
        Total: {bill}
      </FlexEnd>
      <FlexEnd>
        <MuiThemeProvider >
          <RaisedButton label="Cancel" onClick={this.props.handleClose}/>
          <RaisedButton label="Order" onClick={this.props.orderDishes} backgroundColor="#FBC02D"/>
        </MuiThemeProvider>
      </FlexEnd>
     </div>
    )
  }
}
