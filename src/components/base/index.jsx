import React from "react";
import styles from "./styles.module.css";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import SideBar from "../sideBar";
import Title from "../title";
import Content from "../content";
import Chat from "../chat";
import PostDetail from "../postDetail";
import Submit from "../submit";
import Client from "../../client";
import Axios from "axios";

import { baseURL } from "../../utils/http";
import { EXPLORE_GUILD } from "../../redux/actions";

const mapStateToProps = state => ({
  token: state.user.token,
  info: state.user.info,
  explore_guild: state.user.explore_guild
});

const mapDispatchToProps = dispatch => ({
  setExplore: guild => {
    dispatch({ type: EXPLORE_GUILD, value: guild });
  }
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

  if (Array.isArray(props.info.guild)) {
    let newGuild = true;
    props.info.guild.forEach(element => {
      if (element._id === props.match.params.guildID) {
        newGuild = false;
      }
    });

    if (props.explore_guild._id === props.match.params.guildID) {
      newGuild = false;
    }

    if (newGuild) {
      console.log(props.info.guild);
      Axios.get(baseURL + "guest/guild", {
        params: {
          id: props.match.params.guildID
        }
      })
        .then(response => {
          props.setExplore(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  if (
    !Array.isArray(props.info.guild) &&
    props.explore_guild._id !== props.match.params.guildID
  ) {
    Axios.get(baseURL + "guest/guild", {
      params: {
        id: props.match.params.guildID
      }
    })
      .then(response => {
        props.setExplore(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className={styles.baseContainer}>
      <SideBar></SideBar>
      <div className={styles.main}>
        <Title></Title>

        <div className={styles.container}>
          <div className={styles.content}>
            <Switch>
              <Route exact path="/:guildID/:channelID/post">
                <Content></Content>
              </Route>

              <Route exact path="/:guildID/:channelID/submit">
                <Submit></Submit>
              </Route>

              <Route exact path="/:guildID/:channelID/chat">
                <Chat></Chat>
              </Route>

              <Route exact path="/:guildID/:channelID/:postID">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Base));
