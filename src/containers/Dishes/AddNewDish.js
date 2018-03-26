import React, { Component } from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider'
import Modal from  '../../components/Modal'
import TextField from 'material-ui/TextField';

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
     nameErrorText:""
   }, this.props)
   this.handleChange = this.handleChange.bind(this)
 }

handleChange(e) {
  this.setState({
    e.target.name: e.target.value
  })
}

validateForm(obj) {
  if(obj.name === "") {

  }
}
 render() {
   return (
     <AddWrapper>
       <MuiThemeProvider>
         <Modal label="Add Dish" title="Add new dish">
           <TextField floatingLabelText="Name of the dish" name="name" value={this.state.name} onChange={this.handleChange} /><br />
           <TextField floatingLabelText="Description of the dish" name="description" value={this.state.description} onChange={this.handleChange}/><br />
           <TextField floatingLabelText="Predicted orders" name = "predicted_quantity" value={this.state.predicted_quantity} onChange={this.handleChange}/><br/>
         </Modal>
       </MuiThemeProvider>
     </AddWrapper>
   )
 }
}


export default AddNewDish
