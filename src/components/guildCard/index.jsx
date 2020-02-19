import React from "react";
import styles from "./styles.module.css";

import { ossURL } from "../../utils/http";

function GuildCard(props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <svg height="192px" width="256px">
          <foreignObject
            height="192px"
            width="256px"
            mask="url(#svg-mask-vertical-fade)"
          >
            <img
              alt=""
              className={styles.image}
              src={ossURL + props.guild.cover}
            ></img>
          </foreignObject>
        </svg>

        <div className={styles.icon}>
          <div className={styles.iconImage}>
            <img
              alt=""
              className={styles.image}
              src={ossURL + props.guild.avatar}
            ></img>
          </div>
          <div className={styles.info}>{props.guild.name}</div>
        </div>
      </div>

      <div className={styles.guildInfo}>
        <div className={styles.description}>{props.guild.description}</div>
        <div className={styles.memberCount}>
          {props.guild.membercount} 位成员
        </div>
      </div>
    </div>
  );
}

export default GuildCard;
