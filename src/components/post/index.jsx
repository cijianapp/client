import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

import SvgUp from "../../Icons/Up";
import SvgDown from "../../Icons/Down";
import SvgComment from "../../Icons/Comment";
import { ossURL } from "../../utils/http";

function Post(props) {
  let text = "";
  let imgURL = "";
  let videoURL = "";
  let avatarURL = "";
  if (props.post.guildavatar !== "") {
    avatarURL = ossURL + props.post.guildavatar;
  }

  let postType = "normal";

  props.post.content.forEach(node => {
    if (node.type === "paragraph") {
      if (text === "") {
        text = node.children[0].text;
      }
    }
    if (node.type === "image") {
      if (imgURL === "") {
        imgURL = node.url;
      }
    }

    if (node.type === "video") {
      if (videoURL === "") {
        videoURL = node.url;
        postType = "video";
      }
    }
  });

  let media = <img className={styles.image} alt="" src={imgURL}></img>;

  if (postType === "video") {
    media = <video controls className={styles.image} src={videoURL}></video>;
  }

  return (
    <Link
      to={props.post.guild + "/post/" + props.post._id}
      className={styles.link}
    >
      <div className={styles.container}>
        {media}

        <div className={styles.text}>
          <div className={styles.title}>{props.post.title} </div>

          <div className={styles.content}>{text}</div>
        </div>

        <div className={styles.wrapper}>
          <div>
            <img className={styles.icon} alt="" src={avatarURL}></img>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.username}>{props.post.ownername}</div>
            <div className={styles.timeInfo}>
              3 小时前
              <span className={styles.guildInfo}>{props.post.guildname}</span>
            </div>
          </div>
          <div className={styles.icons}>
            <div className={styles.comment}>
              <SvgComment className={styles.vote}></SvgComment>
              <div className={styles.voteNumber}>0</div>
            </div>
            <SvgUp className={styles.vote}></SvgUp>
            <div className={styles.voteNumber}>{props.post.vote}</div>
            <SvgDown className={styles.vote}></SvgDown>{" "}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
