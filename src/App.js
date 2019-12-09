import React, { Fragment } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NewsPage from "./components/NewsPage";
import LoginPage from "./components/LoginPage";
import ChatRoom from "./components/ChatRoom";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";
import PageNotFound from "./components/PageNotFound";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Header />

        <main id="main" className="my-5 py-5">
          <Router>
            <Switch>
              <Route path="/" exact={true}>
                <HomePage />
              </Route>
              <Route path="/news/" exact={true}>
                <NewsPage />
              </Route>
              <Route path="/chatroom/" exact={true}>
                <ChatRoom />
              </Route>
              <Route path="/login/" exact={true}>
                <LoginPage />
              </Route>
              <Route path="/signup/" exact={true}>
                <SignupPage />
              </Route>
              <Route path="/profile/:username" component={ProfilePage}></Route>

              <Route component={PageNotFound}></Route>
            </Switch>
          </Router>
        </main>
      </Fragment>
    );
  }
}
