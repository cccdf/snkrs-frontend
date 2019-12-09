import React from "react";
import {
  Button,
  UncontrolledAlert,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import emitter from "../util/events";

async function getUserInfo() {
  return axios
    .get("https://snkr-news-api.herokuapp.com/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("cool-jwt")}` }
    })
    .then(res => {
      return res.data;
    });
}

async function getUserFav(email) {
  return axios
    .post("https://snkr-news-api.herokuapp.com/users/favoritebrands/search", {
      email: email
    })
    .then(res => {
      if (res.data[0]) {
        return res.data[0].brands;
      } else {
        return res.data.brands;
      }
    });
}

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      brands: [],
      send: false,
      redirect: false,
      loading: true
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.sendPut = this.sendPut.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("cool-jwt")) {
      emitter.emit("loginStatus", true);
    }

    this.setState({ loading: true });

    getUserInfo().then(data => {
      this.setState({
        name: data.name,
        email: data.email,

        loading: false
      });
      getUserFav(data.email).then(brands => {
        this.setState({ brands });
      });
    });
  }
  addItem(e) {
    e.preventDefault();
    let brandsArr = this.state.brands;

    let brand = e.target.innerText;
    if (brandsArr.indexOf(brand) === -1) {
      brandsArr.push(brand);

      this.setState({ brands: brandsArr });
    }
  }
  deleteItem(e) {
    e.preventDefault();
    let filter = this.state.brands.filter(value => {
      return (
        value !==
        e.target.parentNode.innerText.substring(
          0,
          e.target.parentNode.innerText.indexOf("Delete") - 1
        )
      );
    });
    this.setState({ brands: filter });
  }

  sendPut(e) {
    e.preventDefault();
    this.setState({ send: false });
    axios
      .put("https://snkr-news-api.herokuapp.com/users/favoritebrands", {
        email: this.state.email,
        brands: this.state.brands
      })
      .then(res => {
        if (res.status === 201) {
          this.setState({ send: true });
        }
      });
  }

  deleteAccount(e) {
    e.preventDefault();
    console.log(this.state.email);
    axios
      .delete("https://snkr-news-api.herokuapp.com/users/delete", {
        data: {
          email: this.state.email
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ name: "", email: "", brands: [], redirect: true });
          localStorage.removeItem("cool-jwt");
          emitter.emit("loginStatus", false);
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {this.state.send ? (
          <UncontrolledAlert color="info">
            Update successfully
          </UncontrolledAlert>
        ) : null}
        <Row>
          <Col md={4}>
            <p
              data-testid="username"
              style={{ fontWeight: "bold", fontSize: "60px" }}
            >
              Hi! {this.state.name}
            </p>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <Button
              data-testid="deleteaccount"
              color="danger"
              onClick={this.deleteAccount}
              style={{ float: "right" }}
            >
              Delete your account
            </Button>
          </Col>
        </Row>
        <Row>
          <Col style={{ maxWidth: "20%" }}>
            <p data-testid="userchose">Brands you like:</p>
          </Col>
          <Col>
            {this.state.brands ? (
              <ListGroup style={{ maxWidth: "80%" }}>
                {Object.values(this.state.brands).map(brand => {
                  return (
                    <ListGroupItem>
                      {brand}
                      <Button
                        color="danger"
                        onClick={this.deleteItem}
                        style={{ float: "right" }}
                      >
                        Delete
                      </Button>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <p data-testid="choseinfo">
              Choose brand you like we will send an email to you if there are
              new released shoes
            </p>
          </Col>
        </Row>
        <Row data-testid="chosebutton">
          <Col style={{ maxWidth: "10%" }}>
            <Button color="info" onClick={this.addItem}>
              Nike
            </Button>
          </Col>
          <Col style={{ maxWidth: "10%" }}>
            <Button color="info" onClick={this.addItem}>
              Adidas
            </Button>
          </Col>
          <Col style={{ maxWidth: "10%" }}>
            <Button color="info" onClick={this.addItem}>
              Air Jordan
            </Button>
          </Col>
          <Col style={{ maxWidth: "10%" }}>
            <Button color="info" onClick={this.addItem}>
              Yeezy
            </Button>
          </Col>
        </Row>
        <Row>
          <Button data-testid="updatelike" onClick={this.sendPut}>
            Submit
          </Button>
        </Row>
      </div>
    );
  }
}
