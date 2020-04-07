import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function UrlSummerize(props) {
  const [article, setArticle] = useState({
    sentenceNumber: "",
    uploadUrl: "",
    // articleContent: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/result";

  let data = {
    sentenceNumber: article.sentenceNumber,
    uploadUrl: article.uploadUrl,
  };

  const summarize = (e) => {
    // prevent default event(on submit)
    e.preventDefault();

    setShowLoading(true);
    props.history.push({
      pathname: "/result/",
      state: { articleData: data },
    });
  };

  const onChange = (e) => {
    // e.persist();
    var url = "";
    if (e.target.name === "uploadUrl") {
      url = encodeURIComponent(e.target.value);
      setArticle({ ...article, [e.target.name]: e.target.value });
    }
    setArticle({ ...article, [e.target.name]: e.target.value });
    console.log(e.target.name + " ========= " + e.target.value);
  };

  return (
    <div className="container">
      <div className="span12 div-style">
        <h2 className="h2-style text-info">Home - Article Summarizer App</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron>
          <Form onSubmit={summarize}>
            <Form.Group>
              <Form.Label className="font-weight-bold">
                Enter the number of required Sentences.
              </Form.Label>
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
              <Form.Label className="font-weight-bold">
                Enter a url to summerize
              </Form.Label>
              <Form.Control
                type="text"
                accept=".txt"
                name="uploadUrl"
                id="uploadUrl"
                required
                className="custom-file"
                value={article.uploadUrl}
                onChange={onChange}
              />
            </Form.Group>

            {/* <Form.Group>
              <Form.Label className="font-weight-bold">
                Preview (content here will be summarized)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                name="articleContent"
                id="articleContent"
                className="textarea"
                value={article.articleContent}
                onChange={onChange}
              />
            </Form.Group> */}
            <div className="col-12 text-center">
              <Button variant="outline-info col-2" type="summarize">
                Summarize
              </Button>
            </div>
          </Form>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(UrlSummerize);
