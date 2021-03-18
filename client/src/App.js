import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions";

import Header from "./components/Header";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import SurveyNew from "./components/surveys/SurveyNew";
import RouteLinks from "./components/RouteLinks";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Route path="/" component={Landing} exact />
            <RouteLinks path="/surveys" component={Dashboard} exact />
            <RouteLinks path="/surveys/new" component={SurveyNew} exact />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
