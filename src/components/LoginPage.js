import React from "react";
import { Button, UncontrolledAlert, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import emitter from "../util/events";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToPostsPage: false,
      pwdwrong: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    axios
      .post("https://snkr-news-api.herokuapp.com/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("cool-jwt", res.data.token);
        this.setState({ redirectToPostsPage: true });
        emitter.emit("loginStatus", true);
      })
      .catch(err => {
        this.setState({ pwdwrong: true });
      });
  }
  renderForm = () => {
    return (
      <form onSubmit={this.handleSubmit} className="FormFields">
        <Row>
          <Col md={{ span: 6, offset: 0 }}>
            <FormGroup controlId="confirmationCode" bsSize="small">
              <Label for="exampleEmail">Email</Label>
              <Input
                type="text"
                name="email"
                id="Email"
                value={this.state.email}
                placeholder="enter email address"
                onChange={this.handleChange}
                bsSize="small"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 0 }}>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                id="Password"
                placeholder="enter password"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 0 }}>
            <Button>Submit</Button>
          </Col>
        </Row>
      </form>
    );
  };
  render() {
    if (this.state.redirectToPostsPage) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div>
          {this.state.pwdwrong ? (
            <UncontrolledAlert color="info">
              Wrong password or invalid email
            </UncontrolledAlert>
          ) : null}
        </div>
        {this.renderForm()}
      </div>
    );
  }
}
