import React, { useState, useMemo, useRef } from "react";
import commonStyles from "../../utils/styles.module.css";
import styles from "./styles.module.css";
import { Prompt, withRouter } from "react-router-dom";

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

import imageExtensions from "image-extensions";
import axios from "axios";
import { connect } from "react-redux";
import { css } from "emotion";

import { createEditor, Transforms } from "slate";
import {
  Slate,
  Editable,
  withReact,
  useSelected,
  useFocused
} from "slate-react";
import isUrl from "is-url";
import { withHistory } from "slate-history";
import { jsx } from "slate-hyperscript";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import the plugin code
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
// Import the plugin code
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import { baseURL, ossURL } from "../../utils/http";
import Image24Px from "../../icons/Image24Px";
import Movie24Px from "../../icons/Movie24Px";

// Register the plugin
registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

const mapStateToProps = state => ({
  token: state.user.token,
  headerConfig: state.user.headerConfig,
  info: state.user.info
});

function Submit(props) {
  let Guild = {};
  let Channel = {};
  const [submitted, setSubmitted] = useState(false);

  if (Array.isArray(props.info.guild)) {
    props.info.guild.forEach(guild => {
      if (guild._id === props.match.params.guildID) {
        Guild = guild;
        guild.channel.forEach(channel => {
          if (channel._id === props.match.params.channelID) {
            Channel = channel;
          }
        });
      }
    });
  }

  const [showFilePond, setShowFilePond] = useState(styles.notFilePond);
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(
    () => withHtml(withImages(withHistory(withReact(createEditor())))),
    []
  );
  const [title, setTitle] = useState("");

  function post(e) {
    e.preventDefault();

    if (title === "") {
      alert("标题不可以为空");
      return;
    }

    let valueIsNull = true;

    value.forEach(element => {
      if (element.type === "paragraph") {
        if (element.children[0].text !== "") {
          valueIsNull = false;
        }
      } else {
        valueIsNull = false;
      }
    });

    if (valueIsNull) {
      alert("内容不可以为空");
      return;
    }

    const postParams = {
      title: title,
      guild: props.match.params.guildID,
      channel: props.match.params.channelID,
      content: value
    };

    axios
      .post(baseURL + "api/post", postParams, props.headerConfig)
      .then(function(response) {
        if (response.data.code === 200) {
          setSubmitted(true);
          props.history.goBack();
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  const fileInput = useRef();

  function handleFile() {
    try {
      const file = fileInput.current.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        const imageParams = {
          image: reader.result
        };

        axios
          .post(baseURL + "upload/image", imageParams, props.headerConfig)
          .then(function(response) {
            if (response.data.code === 200) {
              insertImage(editor, ossURL + response.data.imageURL);
            }
          })
          .catch(function(errors) {
            console.log(errors);
          });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SimpleBarReact className={styles.bar}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h3>发表新帖</h3>
            <h4>{Guild.name + "#" + Channel.name}</h4>
          </div>

          <input
            placeholder="请输入标题"
            className={commonStyles.input_normal}
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          ></input>

          <div className={styles.toolbar}>
            <div className={styles.iconbar}>
              <div className={commonStyles.icon24_container}>
                <input
                  className={commonStyles.uploadIcon_iconInput}
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  ref={fileInput}
                  onChange={() => {
                    handleFile();
                  }}
                ></input>
                <Image24Px className={commonStyles.icon24_icon}></Image24Px>
              </div>

              <div
                className={commonStyles.icon24_container}
                onClick={e => {
                  if (showFilePond === styles.notFilePond)
                    setShowFilePond(styles.filePond);
                  else {
                    setShowFilePond(styles.notFilePond);
                  }
                }}
              >
                <Movie24Px className={commonStyles.icon24_icon}></Movie24Px>
              </div>
            </div>

            <div className={showFilePond}>
              <FilePond
                maxFiles={1}
                maxFileSize="100MB"
                labelMaxFileSizeExceeded="文件有点大，建议亲压缩后再上传"
                labelMaxFileSize="Maximum file size is {filesize}"
                acceptedFileTypes={["video/mp4"]}
                labelIdle='拖放或<span class="filepond--label-action">选择要上传的视频</span>'
                server={{
                  url: baseURL + "api/upload",
                  process: {
                    ...props.headerConfig,
                    onload: res => {
                      setShowFilePond(styles.notFilePond);

                      insertVideo(editor, ossURL + res);
                    }
                  }
                }}
              ></FilePond>
            </div>
          </div>

          <Slate
            editor={editor}
            value={value}
            onChange={value => setValue(value)}
          >
            <Editable
              className={commonStyles.input_textarea_L}
              renderElement={props => <Element {...props} />}
              placeholder="说点感兴趣的事吧..."
            />
          </Slate>
          <div className={styles.footer}>
            <button
              className={commonStyles.button_common_M}
              onClick={e => {
                props.history.goBack();
              }}
            >
              返回
            </button>

            <div className={styles.buttonContainer}>
              {" "}
              <button className={commonStyles.button_common_M} onClick={post}>
                发布
              </button>
            </div>
          </div>
        </div>
      </div>

      <Prompt
        when={submitted === false}
        message="确定将退出此页面吗?您的编辑尚未保存哦。"
      />
    </SimpleBarReact>
  );
}

const withImages = editor => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return ["image", "video"].includes(element.type) ? true : isVoid(element);
  };

  editor.insertData = data => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = [
    { type: "image", url, children: [text] },
    {
      type: "paragraph",
      children: [
        {
          text: ""
        }
      ]
    }
  ];
  Transforms.insertNodes(editor, image);
};

const insertVideo = (editor, url) => {
  const text = { text: "" };
  const video = [
    { type: "video", url, children: [text] },
    {
      type: "paragraph",
      children: [
        {
          text: ""
        }
      ]
    }
  ];
  Transforms.insertNodes(editor, video);
};

const Element = props => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "image":
      return <ImageElement {...props} />;
    case "video":
      return <VideoElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div className={styles.imageContainer} contentEditable={false}>
        <img
          alt=""
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        />
      </div>
      {children}
    </div>
  );
};

const isImageUrl = url => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

const VideoElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div className={styles.imageContainer} contentEditable={false}>
        <video
          controls
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        >
          <source src={element.url} type="video/mp4"></source>
        </video>
      </div>
      {children}
    </div>
  );
};

const withHtml = editor => {
  const { insertData, isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = data => {
    const html = data.getData("text/html");

    if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

const ELEMENT_TAGS = {
  A: el => ({ type: "link", url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: "quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
  H3: () => ({ type: "heading-three" }),
  H4: () => ({ type: "heading-four" }),
  H5: () => ({ type: "heading-five" }),
  H6: () => ({ type: "heading-six" }),
  IMG: el => ({ type: "image", url: el.getAttribute("src") }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "numbered-list" }),
  P: () => ({ type: "paragraph" }),
  PRE: () => ({ type: "code" }),
  UL: () => ({ type: "bulleted-list" })
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true })
};

const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
  }

  const children = Array.from(parent.childNodes)
    .map(deserialize)
    .flat();

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map(child => jsx("text", attrs, child));
  }

  return children;
};

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

export default withRouter(connect(mapStateToProps)(Submit));
