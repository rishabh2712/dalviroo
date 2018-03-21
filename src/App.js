import React, { Component } from 'react'
import { subscribeToDone, subscribeToOrder } from './Api'
import KitchenReport from './KitchenReport'
import './App.css';
import './bootstrap.css'

class App extends Component {
constructor(props) {
  super(props)
  this.state = {
    data: []
  }
}
componentDidMount() {
  subscribeToOrder((err, data) =>  {
    if(Array.isArray(data))
      this.setState({
        data
    })
  })
}
  render() {
      return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Dalviroo
          </a>
        </nav>
        <KitchenReport data = {this.state.data} subscribeToDone={subscribeToDone}/>
      </div>
    )
  }
}

export default App;
