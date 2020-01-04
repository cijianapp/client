import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Submit from "../submit";
import { baseURL } from "../../utils/http";
import Post from "../post";

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

import Masonry from "react-masonry-css";

const mapStateToProps = state => ({
  headerConfig: state.user.headerConfig
});

function Content(props) {
  const [posts, setPosts] = useState([]);
  const [guildID, setGuildID] = useState("home");

  const postsConfig = {
    ...props.headerConfig,
    params: { guild: props.match.params.guildID }
  };

  if (props.match.params.guildID !== guildID) {
    axios
      .get(baseURL + "api/posts", postsConfig)
      .then(response => {
        let postElements = [
          <div key="info" className={styles.info}>
            <h5 className={styles.h5}>社区详情</h5>
            <Submit></Submit>
          </div>
        ];

        if (response.data === null) {
        } else {
          response.data.forEach(element => {
            postElements.push(<Post key={element._id} post={element}></Post>);
          });
        }

        setPosts(postElements);
      })
      .catch(err => {
        console.log(err);
      });

    setGuildID(props.match.params.guildID);
  }

  const breakpointColumnsObj = {
    default: 3,
    1400: 2,
    1000: 1
  };

  return (
    <SimpleBarReact className={styles.bar}>
      <div className={styles.content}>
        <div className={styles.container}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonryGrid}
            columnClassName={styles.masonryColumn}
          >
            {posts}
          </Masonry>
        </div>
      </div>
    </SimpleBarReact>
  );
}

export default withRouter(connect(mapStateToProps)(Content));
