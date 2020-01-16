import React from "react";
import styles from "./styles.module.css";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import SideBar from "../sideBar";
import Title from "../title";
import Content from "../content";
import PostDetail from "../postDetail";

import Client from "../../client";

const mapStateToProps = state => ({
  token: state.user.token
});

function Base(props) {
  function testa() {
    // client1.channels.get("664322733420576811").send("Your message");
    Client.sendMessage("message", { content: "hello", channel: "a" });
  }

  function testb() {
    // client1.channels.get("664322733420576811").send("Your message");
    Client.sendMessage("message", { content: "bye", channel: "b" });
  }
  return (
    <div className={styles.baseContainer}>
      <SideBar></SideBar>
      <div className={styles.main}>
        <Title></Title>

        <div className={styles.container}>
          <div className={styles.content}>
            <Switch>
              <Route exact path="/:guildID">
                <Content guild={props.match.params.guildID}></Content>
              </Route>

              <Route exact path="/:guildID/post/:postID">
                <PostDetail></PostDetail>
              </Route>
            </Switch>
          </div>

          <div className={styles.members}>
            <button onClick={testa}>测试a</button>
            <button onClick={testb}>测试b</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(Base));
