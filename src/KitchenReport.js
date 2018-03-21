import React, { Component } from 'react'
import {generateReports} from './Api'

class KitchenReport extends Component {
constructor(props) {
  super(props)
}


  render() {
    return (
      <div className="app-container">
        <div className="table-responsive table-wrapper">
          <div className="btn-report">
            <button type="button" className="btn btn-light" onClick={() => generateReports()}>Generate Report</button>
          </div>
          <table className="table table-bordered">
           <thead>
            <tr>
              <th className="active">#</th>
              <th className="active">Name</th>
              <th className="success">Quantity</th>
              <th className="warning">Created-till-now</th>
              <th className="danger">Predicted</th>
              <th className="info">Status</th>
            </tr>
           </thead>
           <tbody>
            {this.props.data.map((datum, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{key+1}</th>
                  <td>{datum.name}</td>
                  <td>{datum.quantity_in_progress}</td>
                  <td>{datum.created_till_now}</td>
                  <td>{datum.predicted}</td>
                  <td><button type="button" className="btn btn-success" onClick={() => this.props.subscribeToDone({id: datum._id, done: datum.quantity_in_progress})}>Done</button></td>
                </tr>
              )}
            )}
           </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default KitchenReport
