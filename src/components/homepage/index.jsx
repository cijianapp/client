import React from "react";
import styles from "./styles.module.css";
import { connect } from "react-redux";

import Avatar from "../avatar";
import UserSetting from "../userSetting";
import HomeContent from "../homeContent";
import Header from "../header";

const mapStateToProps = state => ({
  info: state.user.info
});

function Homepage(props) {
  return (
    <div className={styles.baseContainer}>
      <div className={styles.sideBar}>
        <div className={styles.nav}></div>
        <div className={styles.user}>
          <div className={styles.userInfo}>
            <Avatar url={props.info.avatar}></Avatar>
            <div className={styles.username}>{props.info.username}</div>
          </div>

          <UserSetting></UserSetting>
        </div>
      </div>

      <div className={styles.main}>
        <Header></Header>
        <HomeContent></HomeContent>
      </div>

      {/* <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}></div>

          <div className={styles.members}></div>
        </div>
      </div> */}
    </div>
  );
}

export default connect(mapStateToProps)(Homepage);
