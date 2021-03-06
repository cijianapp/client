import React, { useState } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { baseURL } from "../../utils/http";
import { USER_INFO, EXPLORE_GUILD, TO_LOGIN } from "../../redux/actions";

import Post from "../post";

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

const mapStateToProps = state => ({
  login: state.auth.login,
  headerConfig: state.user.headerConfig,
  info: state.user.info,
  explore_guild: state.user.explore_guild
});

const mapDispatchToProps = dispatch => ({
  setExplore: guild => {
    dispatch({ type: EXPLORE_GUILD, value: guild });
  },
  refresh: () => {
    dispatch({ type: USER_INFO, value: {} });
  },
  toLogin: ifLogin => {
    dispatch({ type: TO_LOGIN, value: ifLogin });
  }
});

function Content(props) {
  let guild = {};

  let isExplore = false;

  if (Array.isArray(props.info.guild)) {
    props.info.guild.forEach(element => {
      if (element._id === props.match.params.guildID) {
        guild = element;
      }
    });
  }

  if (props.explore_guild._id === props.match.params.guildID) {
    guild = props.explore_guild;
    isExplore = true;
  }

  const [posts, setPosts] = useState([]);
  const [channelID, setChannelID] = useState("");

  const postsConfig = {
    ...props.headerConfig,
    params: {
      guild: props.match.params.guildID,
      channel: props.match.params.channelID
    }
  };

  function joinGuild(e) {
    if (!props.login) {
      props.toLogin(true);
    } else {
      const joinParams = { guild: guild._id };

      axios
        .post(baseURL + "api/join", joinParams, props.headerConfig)
        .then(function(response) {
          if (response.data.code === 200) {
            props.refresh();
            props.setExplore({});
          }
        })
        .catch(function(errors) {
          console.log(errors);
        });
    }
  }

  if (props.match.params.channelID !== channelID) {
    axios
      .get(baseURL + "guest/posts", postsConfig)
      .then(response => {
        let postElements = [];

        if (response.data !== null) {
          response.data.forEach(element => {
            postElements.push(<Post key={element._id} post={element}></Post>);
          });
        }

        setPosts(postElements);
      })
      .catch(err => {
        console.log(err);
      });

    setChannelID(props.match.params.channelID);
  }

  return (
    <SimpleBarReact className={styles.bar} forceVisible="y" autoHide={false}>
      <div className={styles.content}>
        <div className={styles.postsContainer}>{posts}</div>

        <div className={styles.sidebarContainer}>
          <div key="info" className={styles.info}>
            <div className={styles.infoContainer}>
              <h4>社区详情</h4>
              <div className={commonStyles.text12_muted}>
                {guild.description}
              </div>
              <div className={styles.membercount}>
                <div className={commonStyles.text12_bold}>
                  {guild.membercount} 位成员
                </div>
              </div>
              {isExplore ? (
                <button
                  className={commonStyles.button_green_M}
                  onClick={joinGuild}
                >
                  加 入 社 区
                </button>
              ) : (
                <Link to={"submit"} className={commonStyles.link_hidden}>
                  <div className={commonStyles.button_common_M}>
                    发 布 新 帖
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </SimpleBarReact>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Content)
);
