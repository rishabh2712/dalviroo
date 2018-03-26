import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components'

import {generateReports, subscribeToOrder, subscribeToDone } from './Api'

const TableWrapper = styled.div`
    margin-top: 50px;
    width: 70%;
`;

class KitchenReport extends Component {
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
      <TableWrapper>
        <MuiThemeProvider>
          <Table onRowSelection={this.handleRowSelection}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Predicted</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.data.map((datum, key) => {
                return (
                  <TableRow key={key}>
                    <TableRowColumn scope="row">{key+1}</TableRowColumn>
                    <TableRowColumn>{datum.name}</TableRowColumn>
                    <TableRowColumn>{datum.quantity_in_progress}</TableRowColumn>
                    <TableRowColumn>{datum.created_till_now}</TableRowColumn>
                    <TableRowColumn>{datum.predicted}</TableRowColumn>
                    <TableRowColumn><RaisedButton label="Done" fullWidth={true} primary = {true} onClick={() => this.subscribeToDone({id: datum._id, done: datum.quantity_in_progress})}/></TableRowColumn>
                  </TableRow>
                )}
              )}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </TableWrapper>
    )
  }
}

export default KitchenReport
