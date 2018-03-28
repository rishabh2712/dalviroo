import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'

const Spinner = () => (
  <div>
    <MuiThemeProvider>
      <CircularProgress size={60} thickness={7} style={{color: '#FBC02D'}} />
    </MuiThemeProvider>
  </div>
);

export default Spinner;
