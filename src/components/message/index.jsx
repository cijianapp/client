import React from "react";
import styles from "./styles.module.css";

function Message(props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src="https://cdn.discordapp.com/avatars/548336943763816468/5a221d6f43e10c3dad2badee71775c15.png?size=128"
          alt=""
        ></img>
        <span className={styles.username}> 大漠孤烟</span>
        <span className={styles.timestamp}>今天21:24</span>
      </div>
      <div className={styles.markup}>{props.content}</div>
    </div>
  );
}

export default Message;
