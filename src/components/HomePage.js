import React from "react";
import { Spinner } from "reactstrap";
import "../css/HomePage.css";
import adidas from "../img/adidas.jpg";
import aj from "../img/aj.jpg";
import nike from "../img/nike.jpg";
import yeezy from "../img/yeezy.jpg";
import InfoCard from "../components/InfoCard";
import emitter from "../util/events";

async function getNikeApi() {
  let response = await fetch("https://snkr-news-api.herokuapp.com/nike");
  let results = await response.json();
  return results;
}

async function getUpComingApi() {
  let response = await fetch("https://snkr-news-api.herokuapp.com/upcoming");
  let results = await response.json();
  return results;
}

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      upcomings: [],
      loading: true
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("cool-jwt")) {
      emitter.emit("loginStatus", true);
    }
    this.setState({ loading: true });
    let upcomings = await getUpComingApi();
    let response = await getNikeApi();
    this.setState({
      results: response,
      upcomings: upcomings,
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading">
          <Spinner color="primary" />
        </div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div
              className="column"
              style={{ width: "70%", justifyContent: "left" }}
            >
              <h3>Coming Soon</h3>
            </div>
            <div className="column" style={{ float: "right" }}>
              <a href="#">See All</a>
            </div>
          </div>
          <div className="row" style={{ height: 260 }}>
            {this.state.upcomings.map(upcoming => {
              return (
                <InfoCard
                  imglink={upcoming.img_link}
                  productlink={upcoming.product_link}
                  producttitle={upcoming.title[1]}
                  releasetime={upcoming.time}
                />
              );
            })}
          </div>

          <div className="row">
            <div
              className="column"
              style={{ width: "70%", justifyContent: "left" }}
            >
              <h3>Recently Released</h3>
            </div>
            <div className="column" style={{ float: "right" }}>
              <a href="#">See All</a>
            </div>
          </div>
          <div className="row" style={{ height: 260 }}>
            {this.state.results.map(result => {
              return (
                <InfoCard
                  imglink={result.img_link}
                  productlink={result.product_link}
                  producttitle={result.title}
                  price={result.price}
                />
              );
            })}
          </div>
          <div className="row">
            <div
              className="column"
              style={{ width: "70%", justifyContent: "left" }}
            >
              <h3>Popular brand</h3>
            </div>
            <div className="column" style={{ float: "right" }}>
              <a href="#">See All</a>
            </div>
          </div>
          <div className="row" style={{ height: 260 }}>
            <div className="column" style={{ backgroundColor: "white" }}>
              <a href="#">
                <img src={aj}></img>
              </a>
            </div>
            <div className="column">
              <a href="/">
                <img src={nike}></img>
              </a>
            </div>
            <div className="column">
              <a href="/">
                <img src={yeezy}></img>
              </a>
            </div>
            <div className="column">
              <a href="/">
                <img src={adidas}></img>
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
}
