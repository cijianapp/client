import React, { useMemo, useCallback, useState } from "react";
import styles from "./styles.module.css";
import { connect } from "react-redux";
import axios from "axios";
import { baseURL } from "../../utils/http";
import { ossURL } from "../../utils/http";
import { withRouter } from "react-router";

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import Vote from "../vote";

import SvgComment from "../../icons/Comment";

const mapStateToProps = state => ({
  headerConfig: state.user.headerConfig
});

function PostDetail(props) {
  const [value, setValue] = useState(initialValue);
  const [postID, setPostID] = useState("");

  const [post, setPost] = useState({});

  const postsConfig = {
    ...props.headerConfig,
    params: { post: props.match.params.postID }
  };

  if (props.match.params.postID !== postID) {
    axios
      .get(baseURL + "api/post", postsConfig)
      .then(response => {
        setValue(response.data.content);
        setPost(response.data);
      })
      .catch(err => {
        console.log(err);
      });

    setPostID(props.match.params.postID);
  }

  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case "paragraph":
        return (
          <p className={styles.p} {...attributes}>
            {children}
          </p>
        );

      case "image":
        return (
          <div className={styles.mediaContainer}>
            <img
              alt=""
              src={element.url}
              className={styles.image}
              {...attributes}
            ></img>
          </div>
        );

      case "video":
        return (
          <div className={styles.mediaContainer}>
            <video
              className={styles.video}
              src={element.url}
              controls
              {...attributes}
            ></video>
          </div>
        );

      case "quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "link":
        return (
          <a {...attributes} href={element.url}>
            {children}
          </a>
        );
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  return (
    <SimpleBarReact className={styles.bar}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.wrapper}>
            <div>
              <img
                className={styles.icon}
                alt=""
                src={ossURL + post.useravatar}
              ></img>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.username}>{post.username}</div>
              <div className={styles.timeInfo}>
                3 小时前
                <span className={styles.guildInfo}>{post.channelname}</span>
              </div>
            </div>
          </div>

          <Slate
            editor={editor}
            value={value}
            onChange={value => setValue(value)}
          >
            <Editable readOnly renderElement={renderElement} />
          </Slate>

          <div className={styles.icons}>
            <div className={styles.comment}>
              <SvgComment className={styles.vote}></SvgComment>
              <div className={styles.voteNumber}>0</div>
            </div>
            <Vote post={post}></Vote>
          </div>
        </div>
      </div>
    </SimpleBarReact>
  );
}

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: ""
      }
    ]
  }
];

export default withRouter(connect(mapStateToProps)(PostDetail));
