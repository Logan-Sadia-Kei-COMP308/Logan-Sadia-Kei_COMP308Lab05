import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function Summerize(props) {
  const [article, setArticle] = useState({
    sentenceNumber: "",
    articleUrl: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/resultUrl";

  let data = {
    sentenceNumber: article.sentenceNumber,
    articleUrl: article.articleUrl,
  };
  const readFile = async function (e) {
    e.persist();
    setArticle({ ...article, [e.target.name]: e.target.value });

    let input = e.target.name;
    let text = await new Response(input.files[0]).text();
    console.log("input =>" + input);

    setArticle({
      ...article,
      [e.target.name]: e.target.value,
      ["articleUrl"]: encodeURIComponent(e.target.value),
    });
  };

  const summarize = (e) => {
    // prevent default event(on submit)
    e.preventDefault();

    data.articleUrl = document.getElementById("articleUrl").value;
    setShowLoading(true);
    axios
      .post(apiUrl, data)
      .then((response) => {
        setShowLoading(false);
          console.log(response.data.articleUrl);
        props.history.push({
          pathname: "/result/",
          state: { articleData: response.data },
        });

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
              <div className="h-style bg-dark">
                  <h2 className="h2-style text-light  ">Url Summerizer - Article Summarizer App</h2>
              </div>
        {showLoading && (
          <Spinner animation="border" role="status">
                      <span className="sr-only bg-dark">Loading...</span>
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
               Enter URL to summerize
              </Form.Label>
              <Form.Control
                type="text"
                name="articleUrl"
                id="articleUrl"
                required
                className="custom-file"
                value={article.articleUrl}
                onChange={onChange}
              />
            </Form.Group>
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

export default withRouter(Summerize);
