import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {fetchDishes} from './actions'
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

  render() {
    return (
      <DishesWrapper>
        <AddNewDish />
        <DishesList />
      </DishesWrapper>
    )
  }
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    fetchDishes: (evt) => dispatch(fetchDishes())
  }
}

const mapStateToProps = (state) => {
  return {
    dishes: state,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishes)
