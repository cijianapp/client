import React from "react";
import styles from "./styles.module.css";

import KeyboardArrowDown24Px from "../../Icons/KeyboardArrowDown24Px";
import CreateChannel from "../createChannel";

function Channels(props) {
  return (
    <div className={styles.channels}>
      <div className={styles.category}>
        <div className={styles.categoryName}>
          <KeyboardArrowDown24Px
            className={styles.categoryNameIcon}
          ></KeyboardArrowDown24Px>
          版面频道
        </div>
        <CreateChannel></CreateChannel>
      </div>
    </div>
  );
}

export default Channels;
