import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import Masonry from "react-masonry-css";

import { baseURL } from "../../utils/http";
import { USER_INFO, EXPLORE_GUILD } from "../../redux/actions";
import Post from "../post";

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

const mapStateToProps = state => ({
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

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(baseURL + "api/homeposts", props.headerConfig)
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

    return () => {
      source.cancel();
    };
  }, [props.headerConfig]);

  const breakpointColumnsObj = {
    default: 3,
    1640: 2,
    1240: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
