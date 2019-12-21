import React from "react";
import FirstPage from "./components/firstPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FirstPage}></Route>
      </Switch>
    </Router>
  );
}

export default Routes;
