import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ossURL } from "../../utils/http";
import { EXPLORE_GUILD } from "../../redux/actions";

const mapStateToProps = state => ({
  token: state.user.token,
  headerConfig: state.user.headerConfig,
  info: state.user.info
});

const mapDispatchToProps = dispatch => ({
  setExplore: guild => {
    dispatch({ type: EXPLORE_GUILD, value: guild });
  }
});

function GuildCard(props) {
  return (
    <Link
      className={commonStyles.link_hidden}
      to={"/" + props.guild._id + "/" + props.guild.channel[0]._id + "/post"}
      onClick={e => {
        let isNewGuild = true;

        if (Array.isArray(props.info.guild)) {
          props.info.guild.forEach(element => {
            if (element._id === props.guild._id) {
              isNewGuild = false;
            }
          });
        }

        if (isNewGuild) props.setExplore(props.guild);
      }}
    >
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <svg height="192px" width="256px">
            <foreignObject
              height="192px"
              width="256px"
              mask="url(#svg-mask-vertical-fade)"
            >
              <img
                alt="cover"
                className={styles.image}
                src={ossURL + props.guild.cover}
              ></img>
            </foreignObject>
          </svg>

          <div className={styles.icon}>
            <div className={styles.iconImage}>
              <img
                alt="avatar"
                className={styles.image}
                src={ossURL + props.guild.avatar}
              ></img>
            </div>
            <div className={styles.name}>{props.guild.name}</div>
          </div>
        </div>

        <div className={styles.guildInfo}>
          <div className={styles.description}>{props.guild.description}</div>
          <div className={styles.memberCount}>
            {props.guild.membercount} 位成员
          </div>
        </div>
      </div>
    </Link>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GuildCard);
