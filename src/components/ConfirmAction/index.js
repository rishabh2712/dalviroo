import React from 'react';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class ConfirmAction extends React.Component {
constructor(props) {
  super(props)
}
componentWillReceiveProps(nextProps) {
  if(nextProps.success) {
    this.props.handleClose()
    nextProps.fetchDishes()
  }
}
render() {
  return (
      <div>
        {this.props.label}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        {this.props.isRequesting ? <CircularProgress /> : <div></div>}
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.props.handleClose}
          />
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={this.props.onSubmit}
          />
        </div>
      </div>
    )
 }
}

export default ConfirmAction
