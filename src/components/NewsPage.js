import React, { Fragment } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Spinner } from "reactstrap";
import "../css/News.css";
import emitter from "../util/events";

async function getNewsApi() {
  let response = await fetch("https://snkr-news-api.herokuapp.com/news");
  let results = await response.json();
  return results;
}

export default class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      tweets: [],
      loading: true
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("cool-jwt")) {
      emitter.emit("loginStatus", true);
    }
    this.setState({ loading: true });
    let response = await getNewsApi();
    let tweets = [];
    response.map(result => {
      tweets.push(result.tweet);
    });
    this.setState({ results: response, tweets: tweets, loading: false });
  }

  render() {
    return (
      <Fragment>
        {this.state.loading ? (
          <div className="loading">
            <Spinner color="primary" />
          </div>
        ) : (
          <ListGroup>
            {this.state.results.map(result => {
              return (
                <ListGroupItem>
                  <p>{result.tweet}</p>

                  <img src={result.photos} width="200"></img>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Fragment>
    );
  }
}
