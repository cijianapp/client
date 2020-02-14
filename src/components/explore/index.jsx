import React from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { baseURL } from "../../utils/http";

import GuildCard from "../guildCard";

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

const mapStateToProps = state => ({
  token: state.user.token,
  headerConfig: state.user.headerConfig,
  info: state.user.info
});

function Explore(props) {
  axios
    .get(baseURL + "api/explore", props.headerConfig)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <SimpleBarReact
      className={styles.container}
      forceVisible="y"
      autoHide={false}
    >
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <h2>此间热门社区</h2>
          <div className={styles.gridList}>
            <GuildCard></GuildCard>
          </div>
        </div>
      </main>
    </SimpleBarReact>
  );
}

export default connect(mapStateToProps)(Explore);
