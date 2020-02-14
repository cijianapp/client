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
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );
  const [title, setTitle] = useState("");

  function post(e) {
    e.preventDefault();

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
            <div className={commonStyles.text1}>发表新帖</div>
            <div className={commonStyles.text2}>
              {Guild.name + "#" + Channel.name}
            </div>
          </div>

          <input
            placeholder="请输入标题"
            className={commonStyles.input1}
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          ></input>

          <div className={styles.toolbar}>
            <div className={styles.iconbar}>
              <div className={styles.iconContainer}>
                <Image24Px className={styles.icon}></Image24Px>
                <input
                  className={styles.iconInput}
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  ref={fileInput}
                  onChange={() => {
                    handleFile();
                  }}
                ></input>
              </div>

              <div
                className={styles.iconContainer}
                onClick={e => {
                  if (showFilePond === styles.notFilePond)
                    setShowFilePond(styles.filePond);
                  else {
                    setShowFilePond(styles.notFilePond);
                  }
                }}
              >
                <Movie24Px className={styles.icon}></Movie24Px>
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
              className={commonStyles.input2}
              renderElement={props => <Element {...props} />}
              placeholder="说点感兴趣的事吧..."
            />
          </Slate>
          <div className={styles.footer}>
            <button
              className={commonStyles.button1}
              onClick={e => {
                props.history.goBack();
              }}
            >
              返回
            </button>
            <button className={commonStyles.button1} onClick={post}>
              发布
            </button>
          </div>
        </div>
      </div>

      <Prompt when={true} message="确定将退出此页面吗?您的编辑尚未保存哦。" />
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
