import React from "react";
import styles from "./styles.module.css";
import { ossURL } from "../../utils/http";

function Avatar(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32px"
      height="32px"
    >
      <foreignObject
        mask={"url(#svg-mask-guilds-default)"}
        width="32px"
        height="32px"
      >
        <div className={styles.icon}>
          <img
            className={styles.icon}
            src={ossURL + props.url}
            alt="头像"
          ></img>
        </div>
      </foreignObject>
    </svg>
  );
}

export default Avatar;
