import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./components/home";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default Routes;
