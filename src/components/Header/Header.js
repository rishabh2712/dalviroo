import React, { Component } from 'react'
import HeaderWrapper from './HeaderWrapper'

class Header extends Component {
constructor(props) {
  super(props)
}



render() {
    return (
    <HeaderWrapper>
      <nav className="navbar navbar-light dalviroo-navbar">
        <div style={{
                  display: 'flex',
                  justifyItems: 'center',
                  alignItems: 'center'
              }}>
          <svg onClick = {this.props.handleToggle}
            fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
          <a className="navbar-brand" href="#" style={{paddingLeft: '10px'}}>
            Dalviroo
          </a>
        </div>
      </nav>
    </ HeaderWrapper>
    )
  }
}

export default Header
