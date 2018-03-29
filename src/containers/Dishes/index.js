import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {fetchDishes, postDish, deleteDish, orderDishes} from './actions'
import AddNewDish from './AddNewDish';
import DishesList from './DishesList'
import Divider from 'material-ui/Divider';
import Hr from '../../components/HrLine'
import Spinner from '../../components/Spinner'
import RaisedButton from 'material-ui/RaisedButton';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import Modal from  '../../components/Modal'
import CheckoutCart from './CheckoutCart'
import ConfirmAction from '../../components/ConfirmAction'

const DishesWrapper = styled.div`
  margin-top: 50px;
  width: 70%;
`;

class Dishes extends React.Component {
  constructor(props) {
   super(props)
   this.reportAction = this.reportAction.bind(this)
   this.handleClose = this.handleClose.bind(this)
   this.deleteOneDish = this.deleteOneDish.bind(this)
   this.addToCart = this.addToCart.bind(this)
   this.deleteFromCart = this.deleteFromCart.bind(this)
   this.orderDishes = this.orderDishes.bind(this)
   this.state = {
     type: "", open: false, id_in_action: '', cart:[]
   }
 }

componentDidMount() {
  this.props.fetchDishes()
  document.addEventListener("keydown", function (e) {
    if (this.state.open && (e.keyCode === 27)) {
      this.handleClose()
    }
  }.bind(this))
}

reportAction(type, id) {
  this.setState({
    type, open: true, id_in_action: id
  })
}

handleClose() {
  this.setState({
    type:"", open: false, id_in_action: ''
  })
}

addToCart(dish) {
  this.setState({
    cart: this.state.cart.concat(dish)
  })
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

deleteFromCart(dish) {
  if(this.state.cart.length > 1) {
    let dishItems = this.state.cart.filter(item => item._id === dish._id).splice(1)
    let updateItems = this.state.cart.filter(item => item._id != dish._id).concat(dishItems)
    this.setState({
      cart : updateItems
    })
  } else if (this.state.cart.length === 1) {
    let dishItems = this.state.cart.filter(item => item._id === dish._id).splice(1)
    let updateItems = this.state.cart.filter(item => item._id != dish._id).concat(dishItems)
    this.setState({
      cart : updateItems
    })
    this.handleClose()
  }
}

deleteOneDish() {
  this.props.deleteDish(this.state.id_in_action)
}

orderDishes() {
  let orders = this.uniqObject(this.state.cart)
  this.props.orderDishes(orders)
}

getModalContent(type) {
  switch (type) {
    case 'Add':
      return <AddNewDish mode="Add"
              handleClose={this.handleClose}
              postDish={this.props.postDish}
              fetchDishes={this.props.fetchDishes}
              isRequesting = {this.props.addDishReducer.requesting}
              error={this.props.addDishReducer.error}
              success={this.props.addDishReducer.success}/>
      break;
    case 'Delete':
      return <ConfirmAction
              label="You really want to delete this item?"
              handleClose={this.handleClose}
              onSubmit={this.deleteOneDish}
              isRequesting = {this.props.deleteDishReducer.requesting}
              error={this.props.deleteDishReducer.error}
              success={this.props.deleteDishReducer.success}/>
      break;
    case 'Edit':
      return <AddNewDish
              mode="Edit"
              postDish={this.props.postDish}
              getDishes={this.props.getDishes}
              handleClose={this.handleClose}
              isRequesting = {this.props.addDishReducer.requesting}
              error={this.props.addDishReducer.error}
              success={this.props.addDishReducer.success}
              dish={this.props.getDishes.dishes.filter(dish => dish._id === this.state.id_in_action)[0]}/>
      break;
    case 'CheckoutCart':
      return <CheckoutCart
              cart={this.state.cart}
              addToCart={this.addToCart}
              deleteFromCart={this.deleteFromCart}
              handleClose={this.handleClose}
              orderDishes={this.orderDishes}
              isRequesting = {this.props.orderDishReducer.requesting}
              error={this.props.orderDishReducer.error}
              success={this.props.orderDishReducer.success}/>
      break;
    default:
  }
}

getLabel() {
 if(this.state.type === "Edit") {
   return "Edit Details"
 } else if(this.state.type === "Add") {
   return "Add new dish"
 } else if(this.state.type === "Delate") {
   return "Confirm Delete"
 } else if(this.state.type === "CheckoutCart") {
   return "Checkout Page"
 }
}
render() {
  console.log(this.state)
  console.log(this.props)
  let label = this.getLabel()
  return (
    <DishesWrapper>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <RaisedButton label="Add new dish" onClick={() => this.reportAction('Add', "")} />
        </MuiThemeProvider>
        {
          this.state.cart.length ?
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <RaisedButton onClick={() => this.reportAction('CheckoutCart', null)}
               backgroundColor="#FBC02D"
                label="Checkout"
               icon={<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                   <path d="M0 0h24v24H0z" fill="none"/>
               </svg>}
             />
           </MuiThemeProvider>
           :
           <div></div>
        }
      </div>
      <Hr />
      {
        this.props.getDishes.requesting ? <Spinner /> :
        <DishesList dishes={this.props.getDishes.dishes}
                    reportAction={this.reportAction}
                    addToCart={this.addToCart}
                    deleteFromCart={this.deleteFromCart}
                    handleClose={this.handleClose} />

      }
      <Modal title={label} open={this.state.open} handleClose={this.handleClose} >
         {this.getModalContent(this.state.type)}
      </Modal>
    </DishesWrapper>
   )
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    fetchDishes: () => dispatch(fetchDishes()),
    postDish: (dish, method, url) => dispatch(postDish(dish, method, url)),
    deleteDish: (dishId) => dispatch(deleteDish(dishId)),
    orderDishes: (orders) => dispatch(orderDishes(orders))
  }
}

const mapStateToProps = (state) => {
  return {
    getDishes: state.dishes.fetchDishReducer,
    addDishReducer:state.dishes.addDishReducer,
    deleteDishReducer:state.dishes.deleteDishReducer,
    orderDishReducer:state.dishes.orderDishReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishes)
