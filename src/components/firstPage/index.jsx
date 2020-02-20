import React from "react";
import styles from "./styles.module.css";

import LoginControl from "../loginControl";
import SvgMask from "../svgMask";
import Explore from "../explore";

function FirstPage() {
  return (
    <div className={styles.container}>
      <SvgMask></SvgMask>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <LoginControl></LoginControl>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <h2>在此间找到你的社区</h2>
          <Explore></Explore>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContainet}>
          <div>此间文化</div>
          <div>条款</div>
          <div>隐私</div>
          <div>工作机会</div>
          <div>客户支持</div>
        </div>
      </footer>
    </div>
  );
}

export default FirstPage;
