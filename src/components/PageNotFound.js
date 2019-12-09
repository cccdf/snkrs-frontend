import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

const TITLE = "PageNot";
export default class PageNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h1>PageNotFound</h1>
      </div>
    );
  }
}
