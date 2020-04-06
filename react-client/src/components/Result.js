import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function Result(props) {
  const [article, setArticle] = useState({
    sentenceNumber: "",
    uploadFile: "",
    articleContent: "",
    summary: ""
  });

  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/result";

  // retrieve the summary result from Home.js
  let state = props.location.state;
  let sentenceNumber = state.articleData.sentenceNumber;
  let articleContent = state.articleData.articleContent;
  let summary = state.articleData.summary;

  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setArticle(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="span12 div-style">
        <h2 className="h2-style text-info">Result - Article Summarizer App</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron>
        <Form.Group className="text-center">
            <Form.Label className="text-info font-weight-bold">Number of Sentences for Summary</Form.Label>
            <Form.Control
              className="text-center"
              type="text"
              rows="5"
              name="sentenceNumber"
              id="sentenceNumber"
              value={sentenceNumber}
              readOnly
            />
          </Form.Group>
        <Form.Group className="text-center">
            <Form.Label className="text-info font-weight-bold">Original Article</Form.Label>
            <Form.Control
              as="textarea"
              rows="10"
              name="articleContent"
              id="articleContent"
              value={articleContent}
              readOnly
            />
          </Form.Group>
          <Form.Group className="text-center">
            <Form.Label className="text-info font-weight-bold">Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows="7"
              name="summary"
              id="summary"
              value={summary}
              readOnly
            />
          </Form.Group>
          <div className="col-12 text-center">
            <a className="col-2 btn btn-outline-info btn-margin" href="/home">
                Summerize Next
            </a>
        </div>

        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(Result);
