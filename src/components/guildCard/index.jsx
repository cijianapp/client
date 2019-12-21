import React from "react";
import styles from "./styles.module.css";

function GuildCard() {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <svg height="144px" width="256px">
          <foreignObject
            height="144px"
            width="256px"
            mask="url(#svg-mask-vertical-fade)"
          >
            <img
              alt=""
              className={styles.image}
              src="https://cdn.discordapp.com/discovery-splashes/253581140072464384/6071cba122c2ae8eeda1fbed6a4b1977.jpg?size=256"
            ></img>
          </foreignObject>
        </svg>

        <div className={styles.icon}>
          <div className={styles.iconImage}>
            <img
              alt=""
              className={styles.image}
              src="https://cdn.discordapp.com/icons/253581140072464384/a_30f70cdd89e44529e2152aa33732af00.png?size=64"
            ></img>
          </div>
          <div className={styles.info}>彩虹6</div>
        </div>
      </div>
    </div>
  );
}

export default GuildCard;
