import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ossURL } from "../../utils/http";
import { EXPLORE_GUILD } from "../../redux/actions";

import UserFriendsSolid from "../../icons/UserFriendsSolid";

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

function GuildMiniCard(props) {
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
        <div className={styles.icon}>
          <div className={styles.iconImage}>
            <img
              alt="avatar"
              className={styles.image}
              src={ossURL + props.guild.avatar}
            ></img>
          </div>
        </div>

        <div className={styles.guildInfo}>
          <div className={styles.infoContainer}>
            <div className={styles.name}>{props.guild.name}</div>

            <div className={styles.memberCount}>
              <UserFriendsSolid className={styles.icon18}></UserFriendsSolid>
              {props.guild.membercount}
            </div>
          </div>

          <div className={styles.description}>{props.guild.description}</div>
        </div>
      </div>
    </Link>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GuildMiniCard);
