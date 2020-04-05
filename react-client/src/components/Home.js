import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function Home(props) {
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
    axios
      .post(apiUrl)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/result/");
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="span12 div-style">
        <h2 className="h2-style">Choose a file to Summerize</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron>
          <Form onSubmit={summerize}>
            <Form.Group>
              <Form.Label>Enter the number of required Sentences.</Form.Label>
              <Form.Control
                type="number"
                id="sentenceNumber"
                min="1"
                step="1"
                placeholder="e.g 3 or 5"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Choose a txt file to Summerize</Form.Label>
              <Form.Control
                type="file"
                id="uploadFile"
                requires
                class="custom-file"
              />
            </Form.Group>
            <Form.Group>
              {/* <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
              /> */}
            </Form.Group>

            <Button variant="outline-primary col-12" type="Summerize">
              Summerize
            </Button>
          </Form>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(Home);
