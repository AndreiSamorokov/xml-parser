import React, { useState } from "react";

import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import Brightness7Icon from '@material-ui/icons/Brightness7'


function App() {
  
  const [xmlvalue, setXmlvalue] = useState([]); 
 

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: orange[500],
      }
    }
  })

  showList();
  
  function showList() { 
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.freelancer.com/rss.xml`
    )
    .then(response => {
      return response.text();
    })
    .then(res => {
      
      var XMLParser = require("react-xml-parser");
      var xml = new XMLParser().parseFromString(res); 
      let items = xml.getElementsByTagName("item"); 
      setXmlvalue(items); 

    });

  }
 
  return (
    <ThemeProvider theme={theme}> 

      <Container>
        <div className="App">
          <header className="App-header">
            <AppBar>
              <Toolbar>
                <Brightness7Icon />
                <Typography variant="h5" > Freelancer Feed </Typography>
              </Toolbar>
            </AppBar>
          </header>
          {xmlvalue.map((item, key) => (
            <ul key={ key }>
                <li>{ item.children[key].value }</li>
            </ul> 
          ))}
        </div>
      </Container>

    </ThemeProvider>
  );  
}

export default App;
