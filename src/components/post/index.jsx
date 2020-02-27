import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import { Link } from "react-router-dom";

import SvgComment from "../../icons/Comment";
import { ossURL } from "../../utils/http";
import { timeDiff } from "../../utils/calc";

import Vote from "../vote";

function Post(props) {
  let text = "";
  let imgURL = "";
  let videoURL = "";
  let avatarURL = "";
  let time = timeDiff(props.post.time);
  if (props.post.useravatar !== "") {
    avatarURL = ossURL + props.post.useravatar;
  }

  let postType = "normal";

  if (Array.isArray(props.post.content))
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

  let media = <img className={styles.media} alt="" src={imgURL}></img>;

  if (postType === "video") {
    media = <video controls className={styles.media} src={videoURL}></video>;
  }

  return (
    <Link
      to={
        "/" + props.post.guild + "/" + props.post.channel + "/" + props.post._id
      }
      className={commonStyles.link_hidden}
    >
      <div className={styles.container}>
        {media}

        <div className={styles.textContainer}>
          <h4 className={styles.title}>{props.post.title}</h4>

          <div className={styles.content}>{text}</div>
        </div>

        <div className={styles.infoWrapper}>
          <div>
            <img className={styles.avatar} alt="avatar" src={avatarURL}></img>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.username}>{props.post.username}</div>
            <div className={styles.timeInfo}>
              {time}
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
