import React from "react";
import styles from "./styles.module.css";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Menu24Px from "../../Icons/Menu24Px";

const mapStateToProps = state => ({
  info: state.user.info
});

function SideBar(props) {
  let guild = {};

  if (props.info.guilds !== undefined) {
    props.info.guilds.forEach(element => {
      if (element._id === props.match.params.guildID) {
        guild = element;
      }
    });
  }

  return (
    <div className={styles.sideBar}>
      <div
        className={styles.guild}
        data-tip
        data-for="guildName"
        data-event="click"
      >
        <div className={styles.guildName}>{guild.name}</div>

        <div className={styles.iconContainer}>
          <Menu24Px className={styles.icon}></Menu24Px>
        </div>
      </div>

      <ReactTooltip
        place="bottom"
        effect="solid"
        id="guildName"
        globalEventOff="click"
        className={styles.guildMenu}
        clickable={true}
      >
        <button
          onClick={e => {
            alert(11111111);
          }}
        >
          ssssssssss
        </button>
        <button
          onClick={e => {
            alert(2222222222);
          }}
        >
          ssssssssss
        </button>
      </ReactTooltip>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(SideBar));
