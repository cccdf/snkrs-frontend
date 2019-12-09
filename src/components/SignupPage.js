import React from "react";
import emitter from "../util/events";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "../css//SignupPage.css";
import axios from "axios";

export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      hasAgreed: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit = async e => {
    e.preventDefault();
    axios
      .post("https://snkr-news-api.herokuapp.com/users/register", {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("cool-jwt", res.data.token);
        emitter.emit("loginStatus", true);
      });

    this.setState({ redirectToPostsPage: true });
  };

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateName() {
    return this.state.name.length > 0;
  }

  validateEmail() {
    return this.state.email.length > 0;
  }
  validatePwd() {
    return this.state.password.length > 0;
  }
  validateConfirmpwd() {
    return (
      this.state.confirmPassword.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  renderForm = () => {
    return (
      <form onSubmit={this.handleSubmit} className="FormFields">
        <Row style={{ marginBottom: 0, paddingBottom: 0 }}>
          <Col md={{ span: 6, offset: 0 }}>
            <FormGroup>
              <Label for="exampleEmail">Full Name</Label>
              <Input
                type="text"
                name="name"
                id="Email"
                value={this.state.name}
                placeholder="enter name"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        {this.validateName() ? null : (
          <div className="error-message">
            <span>Name cannot be empty</span>
          </div>
        )}

        <Row>
          <Col md={{ span: 6, offset: 0 }}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="Email"
                value={this.state.email}
                placeholder="enter email address"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        {this.validateEmail() ? null : (
          <div className="error-message">
            <span>Email cannot be empty</span>
          </div>
        )}
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
        {this.validatePwd() ? null : (
          <div className="error-message">
            <span>Password cannot be empty</span>
          </div>
        )}
        <Row>
          <Col md={{ span: 6, offset: 0 }}>
            <FormGroup>
              <Label for="password">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                id="confirmPassword"
                placeholder="confirm password"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        {this.validateConfirmpwd() ? null : (
          <div className="error-message">
            <span>Confirm password and password should be same</span>
          </div>
        )}
        <Row>
          <Col md={{ span: 6, offset: 0 }}>
            <Button disabled={!this.validateForm()} style={{ marginRight: 20 }}>
              Submit
            </Button>
            <Link to="/login" className="FormField__Link">
              I'm already a member
            </Link>
          </Col>
        </Row>
      </form>
    );
  };

  render() {
    if (this.state.redirectToPostsPage) {
      return <Redirect to="/" />;
    }
    return <div className="SignUp">{this.renderForm()}</div>;
  }
}
