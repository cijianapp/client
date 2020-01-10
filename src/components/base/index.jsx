import React from "react";
import styles from "./styles.module.css";
import { withRouter, Switch, Route } from "react-router-dom";

import SideBar from "../sideBar";
import Title from "../title";
import Content from "../content";
import PostDetail from "../postDetail";

function Base(props) {
  return (
    <div className={styles.baseContainer}>
      <SideBar></SideBar>
      <div className={styles.main}>
        <Title></Title>
        <Switch>
          <Route exact path="/:guildID">
            <Content guild={props.match.params.guildID}></Content>
          </Route>

          <Route exact path="/:guildID/post/:postID">
            <PostDetail></PostDetail>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Base);
