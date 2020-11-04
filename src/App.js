import React, { useState } from "react";

function App() {
  
  const [xmlvalue, setXmlvalue] = useState([]);
  
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
      <button onClick={(e)=>showList()} >Show Job List</button>
      {xmlvalue.map((item, key) => (
        <ul key={ key }>
            <li >{ item.children[key].value }</li>
        </ul> 
      ))}
    </div>
  );  
}

export default App;
