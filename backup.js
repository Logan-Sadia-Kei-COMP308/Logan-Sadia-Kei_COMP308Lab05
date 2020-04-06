import React, { useState } from "react";
//import { TextInput } from 'react-native';
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function Home(props) {
  const [article, setArticle] = useState({
    sentenceNumber: "",
    uploadFile: ""
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/result";
  let text = "";

  const readFile = function (event) {

    var input = event.target;

    var reader = new FileReader();

    reader.onload = function () {
      text = reader.result;
      event.persist();
      setArticle({ ...article, [event.target.name]: text });
      console.log(text);
    };
    reader.readAsText(input.files[0]);

    setArticle({ ...article, [event.target.name]: text });

  };

  const data = {
    sentenceNumber: article.sentenceNumber,
    uploadFileContent: text
  }

  const summerize = (e) => {
    setShowLoading(true);
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/result/");
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setArticle({ ...article, [e.target.name]: e.target.value });
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
                name="sentenceNumber"
                id="sentenceNumber"
                min="1"
                step="1"
                placeholder="e.g 3 or 5"
                value={article.sentenceNumber}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Choose a txt file to Summerize</Form.Label>
              <Form.Control
                type="file"
                name="uploadFile"
                id="uploadFile"
                required
                class="custom-file"
                value={article.uploadFile}
                onChange={readFile}
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