import React from "react";
import styles from "./styles.module.css";

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
            src="https://cdn.discordapp.com/avatars/149231033244450817/ebb31218862c6b39a2e0968bda15281c.png?size=512"
            alt="头像"
          ></img>
        </div>
      </foreignObject>
    </svg>
  );
}

export default Avatar;
