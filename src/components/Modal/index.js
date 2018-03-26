import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'

export default class DialogExampleSimple extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.onSubmit}
      />,
    ]

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child))

    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <RaisedButton label={this.props.label} onClick={this.handleOpen} />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Dialog
            title={this.props.title}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            {childrenWithProps}
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}
