import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";

import { baseURL } from "../../utils/http";
import { USER_INFO } from "../../redux/actions";

import SvgMask from "../svgMask";
import Guilds from "../guilds";
import Explore from "../explore";
import Base from "../base";

const mapStateToProps = state => ({
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
  if (props.token === null) {
    return <Redirect push to="/"></Redirect>;
  }

  return (
    <div>
      <SvgMask></SvgMask>
      <div className={styles.guilds}>
        <Guilds></Guilds>
      </div>
      <div className={styles.base}>
        <Switch>
          <Route exact path="/explore">
            <Explore></Explore>
          </Route>

          <Route exact path="/home"></Route>

          <Route path="/:guildID/:channelID">
            <Base></Base>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
