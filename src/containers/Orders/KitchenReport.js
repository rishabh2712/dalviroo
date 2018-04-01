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
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
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
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <RaisedButton onClick={() => generateReports()}
             backgroundColor="#FBC02D"
              label="Generate Report"
           />
         </MuiThemeProvider>
        <MuiThemeProvider>
          <Table onRowSelection={this.handleRowSelection}
          displayBorder={true}
          stripedRows={true}
          showRowHover={true}
          showCheckboxes={false}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Order</TableHeaderColumn>
                <TableHeaderColumn>Predicted</TableHeaderColumn>
                <TableHeaderColumn>Produced</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.data.map((datum, key) => {
                return (
                  <TableRow key={key}>
                    <TableRowColumn scope="row">{key+1}</TableRowColumn>
                    <TableRowColumn>{datum.dish.name}</TableRowColumn>
                    <TableRowColumn>{datum.quantity}</TableRowColumn>
                    <TableRowColumn>{datum.dish.predicted}</TableRowColumn>
                    <TableRowColumn>{datum.dish.produced}</TableRowColumn>
                    <MuiThemeProvider>
                      <TableRowColumn>
                        <MuiThemeProvider muiTheme={getMuiTheme()}>
                          <RaisedButton onClick={() => subscribeToDone({id: datum.dish._id, order_id: datum._id})}
                             backgroundColor="#FBC02D"
                              label="Done"
                           />
                         </MuiThemeProvider>
                      </TableRowColumn>
                    </MuiThemeProvider>
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
