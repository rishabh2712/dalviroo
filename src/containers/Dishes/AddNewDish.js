import React, { Component } from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const AddWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
class AddNewDish extends React.Component {
  constructor(props) {
   super(props)
 }

 render() {
   return (
     <AddWrapper>
       <MuiThemeProvider>
          <FlatButton label="Add Dish" primary = {true} />
       </MuiThemeProvider>
     </AddWrapper>
   )
 }
}


export default AddNewDish
