import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

import Client from "../../client";
import Message from "../message";

const mapStateToProps = state => ({
  messages: state.websocket.messages
});

function Chat(props) {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollbarRef = useRef(null);

  const scrollToBottom = () => {
    const ScrollElement = scrollbarRef.current.getScrollElement();

    ScrollElement.scrollTo({
      top: ScrollElement.scrollHeight,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    let messageList = [];

    props.messages.forEach(message => {
      messageList.push(<Message content={message.content}></Message>);
    });

    setMessages(messageList);
  }, [props.messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function submitform() {
    Client.sendMessage("message", {
      content: value,
      channel: props.match.params.channelID
    });
    setValue("");
  }

  function onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      submitform();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        {" "}
        <SimpleBarReact
          className={styles.bar}
          forceVisible="y"
          autoHide={false}
          ref={scrollbarRef}
        >
          {messages}
          <div ref={messagesEndRef} className={styles.endRef}></div>
        </SimpleBarReact>
      </div>

      <form className={styles.form} onSubmit={submitform}>
        <div className={styles.channelText}>
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            className={commonStyles.input3}
            placeholder={"请输入消息"}
            onKeyDown={e => onEnterPress(e)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(Chat));
