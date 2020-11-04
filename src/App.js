import React, { useState } from "react";

import Typography from '@material-ui/core/Typography'
import Appbar from '@material-ui/core/AppBar'
import Brightness7Icon from '@material-ui/icons/Brightness7';


function App() {
  
  const [xmlvalue, setXmlvalue] = useState([]);
  
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
    <div>
      <Appbar>
        <Brightness7Icon />
        <Typography variant="h5" > Freelancer Feed </Typography>
      </Appbar>
      {/* <button onClick={(e)=>showList()} >Show Job List</button> */}
      {xmlvalue.map((item, key) => (
        <ul key={ key }>
            <li >{ item.children[key].value }</li>
        </ul> 
      ))}
    </div>
  );  
}

export default App;
