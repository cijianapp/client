import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Submit from "../submit";
import { baseURL } from "../../utils/http";

const mapStateToProps = state => ({
  headerConfig: state.user.headerConfig
});

function Content(props) {
  const postsConfig = {
    ...props.headerConfig,
    params: { guild: props.match.params.guildID }
  };

  axios
    .get(baseURL + "api/posts", postsConfig)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <div className={styles.content}>
      <Submit></Submit>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(Content));
