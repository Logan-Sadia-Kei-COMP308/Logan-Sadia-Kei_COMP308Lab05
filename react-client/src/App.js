import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Button } from "react-bootstrap";
//
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
//

import Home from "./components/Home";
import UrlSummerize from "./components/UrlSummerize";
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
            <Nav.Link href="/home">Summerize File</Nav.Link>
            <Nav.Link href="/urlSummerize">Summerize URL</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <UrlSummerize />} path="/urlSummerize" />
        <Route render={() => <Result />} path="/result" />
      </div>
      <div className="text-center mt-5">
        <Button href="/home" variant="primary">
          Go Summarize
        </Button>
        <p className="text-center mt-5">hello</p>
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
