import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Container,
  Form,
  Input,
  Button,
  Navbar,
  Nav,
  NavbarBrand,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "axios";
import emitter from "../util/events";

const AVATAR =
  "https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg";

async function getUserInfo() {
  return axios
    .get("https://snkr-news-api.herokuapp.com/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("cool-jwt")}` }
    })
    .then(res => {
      return res.data;
    });
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    // this.localStorageUpdated = this.localStorageUpdated.bind(this);
    this.state = {
      name: "",
      email: "",
      status: null
    };
    this.logout = this.logout.bind(this);
    // this.eventEmitter = this.eventEmitter.bind(this);
  }

  componentDidMount() {
    this.eventEmitter = emitter.addListener("loginStatus", status => {
      this.setState({ status });
      getUserInfo().then(data => {
        this.setState({ name: data.name, email: data.email });
      });
    });
    // if (typeof window !== "undefined") {
    //   this.setState({
    //     status: localStorage.getItem("cool-jwt") ? true : false
    //   });
    //   if (localStorage.getItem("cool-jwt")) {
    // getUserInfo().then(data => {
    //   this.setState({ name: data.name, email: data.email });
    // });
    //   }
    //   window.addEventListener("storage", this.localStorageUpdated);
    // }
  }

  componentWillUnmount() {
    emitter.removeListener("loginStatus", () => {});
    // if (typeof window !== "undefined") {
    //   window.removeEventListener("storage", this.localStorageUpdated);
    // }
  }

  // localStorageUpdated() {
  //   if (!localStorage.getItem("cool-jwt")) {
  //     this.updateState(false);

  //     window.onstorage = function(e) {
  //       console.log("no jwt");
  //     };
  //   } else if (!this.state.status) {
  //     this.updateState(true);

  //     window.onstorage = function(e) {
  //       console.log("jwt");
  //     };
  //   }
  // }
  // updateState(value) {
  //   this.setState({ status: value });
  // }

  logout() {
    localStorage.removeItem("cool-jwt");
  }

  render() {
    return (
      <header>
        <Router>
          <Navbar
            fixed="top"
            color="light"
            light
            expand="xs"
            className="border-bottom border-gray bg-white"
            style={{ height: 80 }}
          >
            <NavbarBrand data-testid="logo" href="/">
              SNKRS PARADISE
            </NavbarBrand>
            <Container>
              <Nav className="ml-auto" navbar tabs>
                <Form data-testid="searchform" inline>
                  <Input
                    type="search"
                    className="mr-3"
                    placeholder="Search Newest"
                  ></Input>
                  <Button type="submit" color="info" outline>
                    Search
                  </Button>
                </Form>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    BRAND
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>NIKE</DropdownItem>
                    <DropdownItem>YEEZY</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink data-testid="newslink" href="/news/">
                    NEWS
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink data-testid="chatroom" href="/chatroom/">
                    CHATROOM
                  </NavLink>
                </NavItem>

                {this.state.status ? null : (
                  <NavItem>
                    <NavLink href="/signup/">SIGN UP</NavLink>
                  </NavItem>
                )}

                {this.state.status ? (
                  <NavItem>
                    <NavLink
                      href={`/profile/${this.state.name}`}
                      // to={`/profile/${this.state.name}`}
                    >
                      PROFILE
                    </NavLink>
                  </NavItem>
                ) : (
                  <NavItem>
                    <NavLink href="/login/">LOGIN</NavLink>
                  </NavItem>
                )}
                {this.state.status ? (
                  <NavItem>
                    <NavLink href="/" onClick={this.logout}>
                      LOGOUT
                    </NavLink>
                  </NavItem>
                ) : null}
              </Nav>
            </Container>
          </Navbar>
        </Router>
      </header>
    );
  }
}
