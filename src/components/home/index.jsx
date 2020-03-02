import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";

import { baseURL } from "../../utils/http";
import { USER_INFO } from "../../redux/actions";

import SvgMask from "../svgMask";
import Guilds from "../guilds";
import Homepage from "../homepage";
import Explore from "../explore";
import Base from "../base";
import LoginControl from "../loginControl";

const mapStateToProps = state => ({
  login: state.auth.login,
  token: state.user.token,
  headerConfig: state.user.headerConfig,
  info: state.user.info
});

const mapDispatchToProps = dispatch => ({
  setUserInfo: info => {
    dispatch({ type: USER_INFO, value: info });
  }
});

function Home(props) {
  if (props.login) {
    if (!props.info.hasOwnProperty("username")) {
      axios
        .get(baseURL + "api/info", props.headerConfig)
        .then(response => {
          props.setUserInfo(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <LoginControl></LoginControl>
      <SvgMask></SvgMask>
      <div className={styles.guilds}>
        <Guilds></Guilds>
      </div>
      <div className={styles.base}>
        <Switch>
          <Route exact path="/explore">
            <Explore></Explore>
          </Route>

          <Route path="/:guildID/:channelID">
            <Base></Base>
          </Route>

          <Route exact path="/">
            <Homepage></Homepage>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
