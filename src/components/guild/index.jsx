import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { Add24Px, Search24Px, Logo } from "../../icons";
import { ADD_CLOSED } from "../../redux/actions";
import { ossURL } from "../../utils/http";

import Add from "../add";

const mapStateToProps = state => ({
  addClose: state.user.addClose,
  info: state.user.info
});

const mapDispatchToProps = dispatch => ({
  addModalClosed: () => {
    dispatch({ type: ADD_CLOSED });
  }
});

function Guild(props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [mask, setMask] = useState("url(#svg-mask-guilds-default)");
  const [iconStyle, setIconStyle] = useState(styles.circleIconButton);
  const [pillHeight, setPillHeight] = useState("0px");

  function maskSelected() {
    if (
      props.location.pathname.includes(props.guild._id) ||
      (props.location.pathname === "/" && props.guild._id === "home")
    ) {
    } else {
      setMask("url(#svg-mask-guilds-selected)");
      setPillHeight("20px");
    }
  }

  function maskUnSelected() {
    if (
      props.location.pathname.includes(props.guild._id) ||
      (props.location.pathname === "/" && props.guild._id === "home")
    ) {
    } else {
      setPillHeight("0px");

      setMask("url(#svg-mask-guilds-default)");
    }
  }
  ReactModal.setAppElement("#root");

  useEffect(() => {
    if (props.addClose) {
      setShowAddModal(false);
    }
    if (
      props.location.pathname.includes(props.guild._id) ||
      (props.location.pathname === "/" && props.guild._id === "home")
    ) {
      setMask("url(#svg-mask-guilds-selected)");
      setPillHeight("40px");
      setIconStyle(styles.circleIconButtonSelected);
    } else {
      setMask("url(#svg-mask-guilds-default)");
      setPillHeight("0px");
      setIconStyle(styles.circleIconButton);
    }
  }, [props.addClose, props.location.pathname, props.guild._id]);

  function openAddModal() {
    setShowAddModal(true);
    props.addModalClosed();
  }

  function closeAddModal() {
    setShowAddModal(false);
  }

  if (props.guild._id === "home") {
    return (
      <div
        className={styles.itemWrapper}
        onMouseEnter={() => {
          maskSelected();
        }}
        onMouseLeave={() => {
          maskUnSelected();
        }}
      >
        <div className={styles.pillContainer}>
          <span className={styles.pill} style={{ height: pillHeight }}></span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="48px"
          height="48px"
        >
          <Link to="/">
            <foreignObject mask={mask} width="48px" height="48px">
              <div className={iconStyle}>
                <Logo width="48px" height="48px"></Logo>
              </div>
            </foreignObject>
          </Link>
        </svg>
      </div>
    );
  }

  if (props.guild._id === "add") {
    return (
      <div
        className={styles.itemWrapper}
        onMouseEnter={() => {
          maskSelected();
        }}
        onMouseLeave={() => {
          maskUnSelected();
        }}
      >
        <div className={styles.pillContainer}>
          <span className={styles.pill} style={{ height: pillHeight }}></span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="48px"
          height="48px"
        >
          <foreignObject mask={mask} width="48px" height="48px">
            <div className={iconStyle} onClick={openAddModal}>
              <Add24Px width="24px" height="24px"></Add24Px>
            </div>
          </foreignObject>
        </svg>

        <ReactModal
          isOpen={showAddModal}
          onRequestClose={closeAddModal}
          className={styles.modalAdd}
          overlayClassName={styles.overlay}
        >
          <div>
            <Add></Add>
          </div>
        </ReactModal>
      </div>
    );
  }

  if (props.guild._id === "explore") {
    return (
      <div
        className={styles.itemWrapper}
        onMouseEnter={() => {
          maskSelected();
        }}
        onMouseLeave={() => {
          maskUnSelected();
        }}
      >
        <div className={styles.pillContainer}>
          <span className={styles.pill} style={{ height: pillHeight }}></span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="48px"
          height="48px"
        >
          <Link to="/explore">
            <foreignObject mask={mask} width="48px" height="48px">
              <div className={iconStyle}>
                <Search24Px width="24px" height="24px"></Search24Px>
              </div>
            </foreignObject>
          </Link>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={styles.itemWrapper}
      onMouseEnter={() => {
        maskSelected();
      }}
      onMouseLeave={() => {
        maskUnSelected();
      }}
    >
      <div className={styles.pillContainer}>
        <span className={styles.pill} style={{ height: pillHeight }}></span>
      </div>

      <ReactTooltip
        place="right"
        id="guild"
        effect="solid"
        className={styles.toolTips}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48px"
        height="48px"
        data-tip={props.guild.name}
        data-for="guild"
      >
        <Link
          to={
            "/" + props.guild._id + "/" + props.guild.channel[0]._id + "/post"
          }
        >
          <foreignObject mask={mask} width="48px" height="48px">
            <div className={iconStyle}>
              {props.guild.isavatar ? (
                <img
                  className={styles.icon}
                  src={ossURL + props.guild.avatar}
                  alt="avatar"
                ></img>
              ) : (
                <div className={styles.guildName}>
                  {props.guild.name.substr(0, 3)}
                </div>
              )}
            </div>
          </foreignObject>
        </Link>
      </svg>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Guild));
