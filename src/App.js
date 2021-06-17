import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import ArrayContainer from "./components/ArrayContainer"; 
import "./App.css";

function App() {
  const [unsortedList, setUnsortedList] = useState([]);
  const num = 5;
  // for (var k = 0; k < num; k++) {
  //   // setUnsortedList([...unsortedList, Math.floor(Math.random() * 10) + 1]);
  //   unsortedList.push(Math.floor(Math.random() * 10) + 1);
  // }

  // console.log(unsortedList);
  // useEffect(() => {}, []);
  return (
    <Container fluid>
      <h1 className="text-center">Algorithm Visualizer</h1>
      
      <ArrayContainer/>
    </Container>
  );
}

export default App;
