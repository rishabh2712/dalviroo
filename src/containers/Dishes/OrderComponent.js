import React, { Component } from 'react'
import styled from 'styled-components'

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  padding: 0px 10px;
`

export default class OrderComponent extends React.Component {
  constructor(props) {
   super(props)
   this.cart=[]
   this.state = Object.assign({},{
     counter: 0
   },this.props)
   this.incrementCounter = this.incrementCounter.bind(this)
   this.decrementCounter = this.decrementCounter.bind(this)
 }

 incrementCounter(e) {
   this.setState({
     counter: this.state.counter + 1
   },() => {
     this.props.addToCart(this.props.dish)
   })
 }

 decrementCounter(e) {
   if(this.state.counter>0) {
     this.setState({
       counter: this.state.counter - 1
     },() => {
       this.props.deleteFromCart(this.props.dish)
     })
   }
 }


 render() {
   return (
     <ComponentWrapper>
       <svg value="add" onClick={this.incrementCounter} fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" style = {{ cursor:'pointer'}}>
           <path d="M0 0h24v24H0z" fill="none"/>
           <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
       </svg>
       <div style={{margin: '0px 5px'}}>{this.state.counter}</div>
       <svg onClick={this.decrementCounter} fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" style = {{ cursor:'pointer'}}>
           <path d="M0 0h24v24H0z" fill="none"/>
           <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
       </svg>
     </ComponentWrapper>
   )
 }
}
