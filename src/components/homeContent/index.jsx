import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import axios from "axios";
import { connect } from "react-redux";

import { baseURL } from "../../utils/http";
import { USER_INFO, EXPLORE_GUILD } from "../../redux/actions";

import Post from "../post";
import GuildMiniCard from "../guildMiniCard";

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";
import { Link } from "react-router-dom";

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
  }
});

function HomeContent(props) {
  const [posts, setPosts] = useState([]);
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (props.login) {
      axios
        .get(baseURL + "api/homeposts", {
          ...props.headerConfig,
          cancelToken: source.token
        })
        .then(response => {
          if (response.data !== null) {
            let postList = [];
            response.data.forEach(element => {
              postList.push(<Post key={element._id} post={element}></Post>);
            });
            setPosts(postList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .get(baseURL + "guest/homeposts", {
          cancelToken: source.token
        })
        .then(response => {
          if (response.data !== null) {
            let postList = [];
            response.data.forEach(element => {
              postList.push(<Post key={element._id} post={element}></Post>);
            });
            setPosts(postList);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    axios
      .get(baseURL + "guest/explore", {
        cancelToken: source.token
      })
      .then(response => {
        let guildCardList = [];
        response.data.forEach(element => {
          guildCardList.push(
            <GuildMiniCard guild={element} key={element._id}></GuildMiniCard>
          );
        });

        guildCardList.push();

        setGuilds(guildCardList);
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  }, [props.login, props.headerConfig]);

  return (
    <SimpleBarReact className={styles.bar} forceVisible="y" autoHide={false}>
      <div className={styles.content}>
        <div className={styles.postsContainer}>{posts}</div>
        <div className={styles.sidebarContainer}>
          <div className={styles.tag}>此间热门社区</div>
          {guilds}
          <div className={styles.viewMore}>
            <Link to="/explore" className={commonStyles.link_hidden}>
              <div className={commonStyles.link_normal}>发现更多</div>
            </Link>
          </div>
        </div>
      </div>
    </SimpleBarReact>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
