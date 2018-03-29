import React, { Component } from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField';
import {addNewDish} from './actions'
import FlexEnd from '../../components/FlexComponents/FlexEnd'
import CircularProgress from 'material-ui/CircularProgress';

const AddWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
class AddNewDish extends React.Component {
  constructor(props) {
   super(props)
   this.state = Object.assign({},{
     name:"",description:"", predicted: 0, price: null, priceErrorText: '',
     nameErrorText:"", descriptionErrorText:''
   }, this.props.dish)
   this.handleChange = this.handleChange.bind(this)
   this.postDish =  this.postDish.bind(this)
 }

handleChange(e) {
  this.setState({
    [e.target.name] : e.target.value
  })
}

componentWillReceiveProps(nextProps) {
  if(nextProps.success) {
    this.props.handleClose()
  }
}


validateForm(obj) {
  if(obj.name === "") {
    this.setState({
      nameErrorText: "This field cant be left empty"
    })
    return false
  } else if(obj.description === "") {
    this.setState({
      descriptionErrorText : "This field cant be left empty"
    })
    return false
  } else if (obj.price <= 0 || obj.price === null ) {
    this.setState({
      priceErrorText : "Price have to be real!"
    })
    return false
  }
  return true
}

postDish() {
  if(this.validateForm(this.state)) {
    let method = this.props.mode === 'Edit' ? 'PUT' : 'POST'
    let url = this.props.mode === 'Edit' ? '/'+this.props.dish._id : ""
    this.props.postDish(Object.assign({},{
      name: this.state.name,
      description: this.state.description,
      predicted: parseInt(this.state.predicted),
      price: parseInt(this.state.price)
    }), method, url)
  }
}
 render() {
   let label = this.props.mode === 'edit' ? 'Edit Details' : 'Add new dish'
   return (
    <div>
      <FlexEnd>
        {this.props.isRequesting ?  <CircularProgress /> : <div></div>}
      </FlexEnd>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <TextField errorText={this.state.nameErrorText} fullWidth={true} floatingLabelText="Name of the dish" name="name" value={this.state.name} onChange={this.handleChange} /><br />
      </MuiThemeProvider>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <TextField errorText={this.state.descriptionErrorText} fullWidth={true} floatingLabelText="Description of the dish" name="description" value={this.state.description} onChange={this.handleChange}/><br />
      </MuiThemeProvider>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <TextField type="number" floatingLabelText="Predicted orders" name="predicted" value={this.state.predicted} onChange={this.handleChange}/><br/>
      </MuiThemeProvider>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <TextField type="number" errorText={this.state.priceErrorText} floatingLabelText="Price" name="price" value={this.state.price} onChange={this.handleChange}/><br/>
      </MuiThemeProvider>
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.postDish}
      />
    </div>
   )
 }
}


export default AddNewDish
