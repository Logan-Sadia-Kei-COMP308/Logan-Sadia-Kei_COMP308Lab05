import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
//

import Home from "./components/Home";
import Result from "./components/Result";
//
function App() {
  return (
    <Router>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand>Article Summarizer App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => <Result />} path="/result" />
        <Route render={() => <Home />} path="/" />
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
