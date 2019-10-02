import React from "react";
import Hospital from "./components/hospital";
import WrappedRegistrationForm from "./components/signup";
import SignInSide from "./components/signin";
import GoogleMap from "./components/map";
import Profile from "./components/profile";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/signup" component={WrappedRegistrationForm} />
          <Route exact path="/" component={SignInSide} />
          <Route path="/find" component={GoogleMap} />
          <Route path="/messages/:repo" component={Hospital} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    );
  }
}

export default App;
