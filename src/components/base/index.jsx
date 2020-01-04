import React from "react";
import styles from "./styles.module.css";
import { withRouter } from "react-router-dom";

import SideBar from "../sideBar";
import Title from "../title";
import Content from "../content";

function Base(props) {
  return (
    <div className={styles.baseContainer}>
      <SideBar></SideBar>
      <div className={styles.main}>
        <Title></Title>
        <Content guild={props.match.params.guildID}></Content>
      </div>
    </div>
  );
}

export default withRouter(Base);
