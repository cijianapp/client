import React from "react";
import styles from "./styles.module.css";

import SideBar from "../sideBar";
import Title from "../title";
import Content from "../content";

function Base() {
  return (
    <div className={styles.baseContainer}>
      <SideBar></SideBar>
      <div className={styles.main}>
        <Title></Title>
        <Content></Content>
      </div>
    </div>
  );
}

export default Base;
