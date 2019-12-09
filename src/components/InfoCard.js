import React from "react";
import "../css/InfoCard.css";
export default class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      upcomings: [],
      loading: true
    };
  }

  render() {
    return (
      <div className="infocard">
        <img
          width="200"
          height="200"
          className="shoesimage"
          src={this.props.imglink}
        ></img>
        <div className="title">
          <a href={this.props.productlink}>{this.props.producttitle}</a>
        </div>
        {this.props.releasetime ? (
          <div className="time">
            <p>{this.props.releasetime}</p>
          </div>
        ) : (
          <div className="price">
            <p>Price: ${this.props.price}</p>
          </div>
        )}
      </div>
    );
  }
}
