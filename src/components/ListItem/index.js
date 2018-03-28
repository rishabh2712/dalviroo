import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components'

const CardClass = styled.div`
  &:hover {
   box-shadow: 0 0 11px rgba(33,33,33,.2);
 }
`

const ExtraTab = styled.div`
color: rgba(0,0,0,.54);
font-size: 18px;
font-weight: 400;`

const ListItem = (props) => (
  <div className="col-xs-12 col-sm-6 col-md-4">
    <CardClass>
      <MuiThemeProvider>
        <Card style={{margin: '10px 0px'}}>
          <CardHeader
            title={props.title}
            subtitle={props.subtitle}
            style={{fontWeight: 'bold'}}
          />
          <CardText expandable={false}>
            <ExtraTab>
            Predicted orders: {props.cardText}
            </ExtraTab>
          </CardText>
          <CardActions>
            <svg fill="#000000" onClick = {() => props.deleteItem(props.id)} value={props.id} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <svg fill="#000000" onClick={() => props.editItem(props.id)} value={props.id} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    </CardClass>
  </div>
);

export default ListItem;
