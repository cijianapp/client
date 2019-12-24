import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import FirstPage from "./components/firstPage";
import Home from "./components/home";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FirstPage}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default Routes;
