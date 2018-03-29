import React, { Component } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import Header from '../../components/Header/Header.js'
import KitchenReport from '../Orders/KitchenReport'
import Dishes from '../Dishes'
import Sidebar from '../../components/Sidebar/Sidebar'
import './App.css';
import './bootstrap.css'


const AppWrapper = styled.div`
  height: inherit;
`;

 const AppContainer = styled.div`
   display: flex;
   justify-content: center;
   flex-direction: row;
 `;

export default class App extends React.Component {
  constructor(props) {
   super(props);
   this.state = {open: false};
 }
  handleToggle = () => this.setState({open: !this.state.open})
  render() {
    return (
      <AppWrapper>
        <Header handleToggle = {this.handleToggle}/>
        <Sidebar open = {this.state.open} handleToggle={this.handleToggle} />
          <AppContainer>
            <Switch>
              <Route exact path="/dalviroo" component={KitchenReport} />
              <Route exact path="/dalviroo/dishes" component = {Dishes}/>
            </Switch>
          </AppContainer>
      </AppWrapper>
    )
  }
}
