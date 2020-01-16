import React from "react";
import styles from "./styles.module.css";

import UserFriendsSolid from "../../Icons/UserFriendsSolid";

function Title() {
  return (
    <div className={styles.title}>
      <div className={styles.name}>频道名</div>
      <div>
        <div className={styles.iconContainer}>
          <UserFriendsSolid className={styles.icon}></UserFriendsSolid>
        </div>
      </div>
    </div>
  );
}

export default Title;
