import React, { Fragment } from "react";
// import getNikeApi from './getNikeApi';
import { ListGroup, ListGroupItem, Collapse, Button } from "reactstrap";

async function getNikeApi() {
  let response = await fetch("https://snkr-news-api.herokuapp.com/nike");
  let results = await response.json();
  return results;
}

export default class NikeSnkrs extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      results: [],
      collapse: false
    };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  async componentDidMount() {
    let response = await getNikeApi();
    this.setState({ results: response, loading: false });
  }

  render() {
    return (
      <Fragment>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          Nike
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <ListGroup>
            {this.state.results.map(result => {
              return (
                <ListGroupItem>
                  <a href={result.product_link}>{result.title}</a>
                  <p>Price:{result.price}</p>
                  {/* <p>Release Time!</p> */}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Collapse>
      </Fragment>
    );
  }
}
