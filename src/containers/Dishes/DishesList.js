import React, { Component } from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider'
import ListItem from '../../components/ListItem'
import OrderComponent from './OrderComponent'

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  padding-top: 16px;
`
const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: row;
`
const ExtraTab = styled.div`
color: rgba(0,0,0,.54);
font-size: 18px;
font-weight: 400;`

const CardClass = styled.div`
  box-shadow: 0px 2px 3px 0px rgba(111,111,111,0.39);
  &:hover {
   box-shadow: 0 0 11px rgba(33,33,33,.2);
 }
`
const CardFooters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`
class DishesList extends React.Component {
  constructor(props) {
   super(props)
 }

 render() {
   return (
     <ListWrapper>
      <div className="container">
        <div className="row">
          {this.props.dishes.map((dish, key) =>
            <div className="col-xs-12 col-sm-6 col-md-4" key={key}>
              <CardClass>
                <MuiThemeProvider>
                  <Card>
                    <FlexEnd>
                      <svg fill="#000000" onClick = {() => this.props.reportAction('Delete',dish._id)} value={dish._id} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                      </svg>
                      <svg fill="#000000" onClick={() => this.props.reportAction('Edit', dish._id)} value={dish._id} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                      </svg>
                    </FlexEnd>
                    <CardHeader
                      title={dish.name}
                      subtitle={dish.description}
                      style={{fontWeight: 'bold'}}
                    />
                    <CardText expandable={false}>
                      <ExtraTab>
                        Predicted orders: {dish.predicted}
                      </ExtraTab>
                      <Divider />
                      <CardFooters>
                        Price: Rs.{dish.price}
                        <OrderComponent addToCart={this.props.addToCart} deleteFromCart={this.props.deleteFromCart} dish={dish}/>
                      </CardFooters>
                    </CardText>
                  </Card>
                </MuiThemeProvider>
              </CardClass>
            </div>
          )}
        </div>
      </div>
     </ListWrapper>
   )
 }
}


export default DishesList
