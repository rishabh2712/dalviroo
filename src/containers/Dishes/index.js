import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {fetchDishes} from './actions'

class Dishes extends React.Component {
  constructor(props) {
   super(props)
 }

 componentDidMount() {
    this.props.fetchDishes()
 }

  render() {
    console.log("mounted");
    console.log(this.props)
    return (
      <div></div>
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
