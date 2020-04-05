import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function Result(props) {
  const [student, setStudent] = useState({
    _id: "",
    studentId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    program: "",
    address: "",
    city: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const summerize = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {};
  };

  const onChange = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="span12 div-style">
        <h2 className="h2-style">Student Sign up</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron>
          <Form.Group>
            <Form.Label>Choose a txt file to Summerize</Form.Label>
            <Form.Control type="file" id="uploadFile" />
          </Form.Group>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(Result);
