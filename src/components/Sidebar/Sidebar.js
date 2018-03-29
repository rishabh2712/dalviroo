import React from 'react';
import Drawer from 'material-ui/Drawer';
import {MenuItem} from 'material-ui';
import {RaisedButton} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import  {Link} from 'react-router-dom'
export default class Sidebar extends React.Component {

constructor(props) {
  super()
  this.state = {
    isDrawerOpen: false
  }
  this.changeRoute = this.changeRoute.bind(this)
}
changeRoute(e) {

}
  render() {
    return (
      <div>
       <MuiThemeProvider>
          <Drawer
            open={this.props.open}
            docked={false}
            onRequestChange={this.props.handleToggle}
            >
             <Link to="/dalviroo"><MenuItem onClick = {this.props.handleToggle}> Orders </MenuItem></Link>
             <Link to="/dalviroo/dishes"><MenuItem onClick = {this.props.handleToggle}>Dalviroo Dishes</MenuItem></Link>
          </Drawer>
        </ MuiThemeProvider>
      </div>
    );
  }
}
