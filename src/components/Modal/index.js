import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'

export default class DialogExampleSimple extends React.Component {

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child))

    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Dialog
            title={this.props.title}
            modal={true}
            actions={this.props.action}
            open={this.props.open}
            onRequestClose={this.props.handleClose}
            autoScrollBodyContent={true}
          >
            {childrenWithProps}
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}
