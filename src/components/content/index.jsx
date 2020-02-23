import React, { useState } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

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
  const [channelID, setChannelID] = useState("");

  const postsConfig = {
    ...props.headerConfig,
    params: {
      guild: props.match.params.guildID,
      channel: props.match.params.channelID
    }
  };

  if (props.match.params.channelID !== channelID) {
    axios
      .get(baseURL + "api/posts", postsConfig)
      .then(response => {
        let postElements = [
          <div key="info" className={styles.info}>
            <div className={styles.infoContainer}>
              <h4>社区详情</h4>
              <Link to={"submit"} className={commonStyles.link_hidden}>
                <div className={commonStyles.button_common_M}>发 布 新 帖</div>
              </Link>
            </div>
          </div>
        ];

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

  const breakpointColumnsObj = {
    default: 3,
    1400: 2,
    1000: 1
  };

  return (
    <SimpleBarReact className={styles.bar} forceVisible="y" autoHide={false}>
      <div className={styles.content}>
        <div className={styles.container}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonryGrid}
            columnClassName=""
          >
            {posts}
          </Masonry>
        </div>
      </div>
    </SimpleBarReact>
  );
}

export default withRouter(connect(mapStateToProps)(Content));
