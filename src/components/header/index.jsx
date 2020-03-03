import React from "react";
import styles from "./styles.module.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import LoginControl from "../loginControl";

const mapStateToProps = state => ({
  info: state.user.info
});

function Header(props) {
  return (
    <div className={styles.title}>
      <div className={styles.name}>此 间</div>
      <LoginControl></LoginControl>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(Header));
