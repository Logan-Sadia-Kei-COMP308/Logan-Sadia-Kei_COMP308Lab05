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
    uploadFile: "",
    articleContent: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/result";
  let data = {
    sentenceNumber: article.sentenceNumber,
    uploadFile: article.uploadFile,
    articleContent: article.articleContent,
  };
  const readFile = async function (e) {
    e.persist();
    setArticle({ ...article, [e.target.name]: e.target.value });

    let input = e.target;
    let text = await new Response(input.files[0]).text();

    let temp = document.getElementById("articleContent");
    temp.value = text;
  };

  const summerize = (e) => {
    // prevent default event(on submit)
    e.preventDefault();

    data.articleContent = document.getElementById("articleContent").value;
    setShowLoading(true);
    axios
      .post(apiUrl, data)
      .then((response) => {
        setShowLoading(false);

        props.history.push({
          pathname: "/result/",
          state: { articleData: response.data },
        });
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    console.log(typeof e.target.name);
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
          <Form
            onSubmit={summerize}
            method="POST"
            type="enctype=multipart/form-data"
          >
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
                className="custom-file"
                value={article.uploadFile}
                onChange={readFile}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="10"
                name="articleContent"
                id="articleContent"
                value={article.articleContent}
                readOnly
              />
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
