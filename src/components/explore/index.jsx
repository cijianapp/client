import React, { useState, useEffect } from "react";
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
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(baseURL + "guest/explore", {
        ...props.headerConfig,
        cancelToken: source.token
      })
      .then(response => {
        let guildCardList = [];
        response.data.forEach(element => {
          guildCardList.push(
            <GuildCard guild={element} key={element._id}></GuildCard>
          );
        });

        setGuilds(guildCardList);
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  }, [props.headerConfig]);

  return (
    <SimpleBarReact
      className={styles.container}
      forceVisible="y"
      autoHide={false}
    >
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <h2>此间热门社区</h2>
          <div className={styles.gridList}>{guilds}</div>
        </div>
      </main>
    </SimpleBarReact>
  );
}

export default connect(mapStateToProps)(Explore);
