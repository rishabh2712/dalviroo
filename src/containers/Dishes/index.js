import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {fetchDishes, postDish} from './actions'
import AddNewDish from './AddNewDish';
import DishesList from './DishesList'

const DishesWrapper = styled.div`
  margin-top: 50px;
  width: 70%;
`;

class Dishes extends React.Component {
  constructor(props) {
   super(props)
 }

 componentDidMount() {
    this.props.fetchDishes()
 }

 componentWillReceiveProps(nextProps) {
    
  }


  render() {
    return (
      <DishesWrapper>
        <AddNewDish addNewDish={this.props.postDish} />
        <DishesList />
      </DishesWrapper>
    )
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    fetchDishes: (evt) => dispatch(fetchDishes()),
    postDish: (dish) => dispatch(postDish(dish))
  }
}

const mapStateToProps = (state) => {
  return {
    dishes: state,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishes)
