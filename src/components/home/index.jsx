import React from "react";
import styles from "./styles.module.css";

import Guilds from "../guilds";

function Home() {
  return (
    <div>
      <div className={styles.guilds}>
        <Guilds></Guilds>
      </div>
      <div className={styles.base}></div>
    </div>
  );
}

export default Home;
