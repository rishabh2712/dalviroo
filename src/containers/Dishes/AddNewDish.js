import React, { Component } from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Modal from  '../../components/Modal'
import TextField from 'material-ui/TextField';
import {addNewDish} from './actions'

const AddWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
class AddNewDish extends React.Component {
  constructor(props) {
   super(props)
   this.state = Object.assign({},{
     name:"",description:"", predicted_quantity: 0,
     nameErrorText:"", descriptionErrorText:''
   }, this.props)
   this.handleChange = this.handleChange.bind(this)
   this.postDish =  this.postDish.bind(this)
 }

handleChange(e) {
  this.setState({
    [e.target.name] : e.target.value
  })
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
  }
  return true
}

postDish() {
  if(this.validateForm(this.state)) {
    this.props.addNewDish(Object.assign({},{
      name: this.state.name,
      description: this.state.description,
      predicted: parseInt(this.state.predicted_quantity)
    }))
  }
}
 render() {
   return (
     <AddWrapper>
       <Modal label="Add Dish" title="Add new dish" onSubmit = {this.postDish}>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <TextField errorText={this.state.nameErrorText} floatingLabelText="Name of the dish" name="name" value={this.state.name} onChange={this.handleChange} /><br />
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <TextField errorText={this.state.descriptionErrorText} floatingLabelText="Description of the dish" name="description" value={this.state.description} onChange={this.handleChange}/><br />
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <TextField type="number" floatingLabelText="Predicted orders" name = "predicted_quantity" value={this.state.predicted_quantity} onChange={this.handleChange}/><br/>
          </MuiThemeProvider>
       </Modal>
     </AddWrapper>
   )
 }
}


export default AddNewDish
