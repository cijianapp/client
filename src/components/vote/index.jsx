import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { connect } from "react-redux";

import SvgUp from "../../Icons/Up";
import SvgDown from "../../Icons/Down";
import { baseURL } from "../../utils/http";
import { VOTE_POST } from "../../redux/actions";

const mapStateToProps = state => ({
  headerConfig: state.user.headerConfig,
  info: state.user.info
});

const mapDispatchToProps = dispatch => ({
  voteSubmit: (post, vote) => {
    dispatch({ type: VOTE_POST, post: post, value: vote });
  }
});

function Vote(props) {
  let vote = "";
  let upStyle = [styles.upvote, styles.colorDefault].join(" ");
  let downStyle = [styles.downvote, styles.colorDefault].join(" ");
  let numberStyle = [styles.voteNumber, styles.colorDefault].join(" ");

  props.info.vote.forEach(element => {
    if (element.post === props.post._id) {
      vote = element.vote;
    }
  });

  const [voteNumber, setVoteNumber] = useState(props.post.vote);

  React.useEffect(() => {
    setVoteNumber(props.post.vote);
  }, [props.post.vote]);

  if (vote === "up") {
    upStyle = [styles.upvote, styles.colorUp].join(" ");
    numberStyle = [styles.voteNumber, styles.colorUp].join(" ");
  }

  if (vote === "down") {
    downStyle = [styles.downvote, styles.colorDown].join(" ");
    numberStyle = [styles.voteNumber, styles.colorDown].join(" ");
  }

  function submit(e, voteString) {
    if (voteString === "up") {
      if (vote === "") {
        props.voteSubmit(props.post._id, "up");
        postVote("up");
        setVoteNumber(voteNumber + 1);
      }

      if (vote === "up") {
        props.voteSubmit(props.post._id, "");
        postVote("");
        setVoteNumber(voteNumber - 1);
      }

      if (vote === "down") {
        props.voteSubmit(props.post._id, "up");
        postVote("up");
        setVoteNumber(voteNumber + 2);
      }
    }

    if (voteString === "down") {
      if (vote === "") {
        props.voteSubmit(props.post._id, "down");
        postVote("down");
        setVoteNumber(voteNumber - 1);
      }

      if (vote === "up") {
        props.voteSubmit(props.post._id, "down");
        postVote("down");
        setVoteNumber(voteNumber - 2);
      }

      if (vote === "down") {
        props.voteSubmit(props.post._id, "");
        postVote("down");
        setVoteNumber(voteNumber + 1);
      }
    }

    e.preventDefault();
  }

  function postVote(voteString) {
    const postParams = {
      post: props.post._id,
      vote: voteString
    };

    axios
      .post(baseURL + "api/vote", postParams, props.headerConfig)
      .then(function(response) {
        if (response.data.code === 200) {
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer} onClick={e => submit(e, "up")}>
        <SvgUp className={upStyle}></SvgUp>
      </div>
      <div className={numberStyle}>{voteNumber}</div>
      <div className={styles.iconContainer} onClick={e => submit(e, "down")}>
        <SvgDown className={downStyle}></SvgDown>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
