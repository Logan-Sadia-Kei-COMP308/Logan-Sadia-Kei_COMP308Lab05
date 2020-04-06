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
    summary: "",
  });

  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/result";

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
        <h2 className="h2-style">Student Sign up</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron>
          <Form.Group>
            <Form.Label>Summary</Form.Label>
            <Form.Control
              type="text"
              id="summary"
              name="summary"
              value={article.summary}
            />
          </Form.Group>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(Result);
