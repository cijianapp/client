import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

import SvgComment from "../../icons/Comment";
import { ossURL } from "../../utils/http";

import Vote from "../vote";

function Post(props) {
  let text = "";
  let imgURL = "";
  let videoURL = "";
  let avatarURL = "";
  if (props.post.useravatar !== "") {
    avatarURL = ossURL + props.post.useravatar;
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
      to={
        "/" + props.post.guild + "/" + props.post.channel + "/" + props.post._id
      }
      className={styles.link}
    >
      <div className={styles.container}>
        {media}

        <div className={styles.text}>
          <div className={styles.title}>{props.post.title}</div>

          <div className={styles.content}>{text}</div>
        </div>

        <div className={styles.wrapper}>
          <div>
            <img className={styles.icon} alt="" src={avatarURL}></img>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.username}>{props.post.username}</div>
            <div className={styles.timeInfo}>
              3 小时前
              <span className={styles.guildInfo}>{props.post.channelname}</span>
            </div>
          </div>
          <div className={styles.icons}>
            <div className={styles.comment}>
              <SvgComment className={styles.vote}></SvgComment>
              <div className={styles.voteNumber}>0</div>
            </div>
            <Vote post={props.post} voteNumber={props.post.vote}></Vote>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
