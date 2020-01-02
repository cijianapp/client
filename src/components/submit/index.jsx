import React, { useState, useMemo } from "react";
import styles from "./styles.module.css";
import ReactModal from "react-modal";
import imageExtensions from "image-extensions";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createEditor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import isUrl from "is-url";
import { withHistory } from "slate-history";

import { baseURL } from "../../utils/http";

const mapStateToProps = state => ({
  token: state.user.token,
  headerConfig: state.user.headerConfig
});

function Submit(props) {
  const [showModal, setShowModal] = useState(false);
  ReactModal.setAppElement("#root");
  function closeModal() {
    setShowModal(false);
  }

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
      content: value
    };

    axios
      .post(baseURL + "api/post", postParams, props.headerConfig)
      .then(function(response) {
        if (response.data.code === 200) {
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  return (
    <div>
      <button
        onClick={e => {
          setShowModal(true);
        }}
      >
        postpostpostpost
      </button>
      <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <article className={styles.container}>
          <input
            placeholder="请输入标题"
            className={styles.input}
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          ></input>
          <div className={styles.postMain}>
            <Slate
              editor={editor}
              value={value}
              onChange={value => setValue(value)}
            >
              <Editable
                renderElement={props => <Element {...props} />}
                placeholder="说点感兴趣的事把..."
              />
            </Slate>
          </div>
          <div className={styles.footer}>
            <button className={styles.button}>返回</button>
            <button className={styles.button} onClick={post}>
              发布
            </button>
          </div>
        </article>
      </ReactModal>
    </div>
  );
}

const withImages = editor => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === "image" ? true : isVoid(element);
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
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const Element = props => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "image":
      return <ImageElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const ImageElement = ({ attributes, children, element }) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img alt="sss" src={element.url} />
      </div>
      {children}
    </div>
  );
};

// const InsertImageButton = () => {
//   const editor = useEditor();
//   return (
//     <Button
//       onMouseDown={event => {
//         event.preventDefault();
//         const url = window.prompt("Enter the URL of the image:");
//         if (!url) return;
//         insertImage(editor, url);
//       }}
//     >
//       <Icon>image</Icon>
//     </Button>
//   );
// };

const isImageUrl = url => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text:
          "In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos."
      }
    ]
  },
  {
    type: "image",
    url: "https://source.unsplash.com/kFrdX5IeQzI",
    children: [{ text: "" }]
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your keyboard and paste it anywhere in the editor!"
      }
    ]
  }
];

export default withRouter(connect(mapStateToProps)(Submit));
