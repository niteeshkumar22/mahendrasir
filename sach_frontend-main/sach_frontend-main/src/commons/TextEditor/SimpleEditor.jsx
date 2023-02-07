import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
function SimpleEditor(props) {
  const { value, setValue,eventId,type, alreadyFilled, readOnly } = props;
  const textEditor = {
    modules: { 
      toolbar: [
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ]
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    },

    formats: [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
    ],
  }
  if (type!="testimonial"){
    textEditor.modules.toolbar.push(["link", "image", "video"]  )
  }

  const [editorValue, setEditorValue] = useState(value);
  const [isFirstTime, setIsFirstTime] = useState((eventId || alreadyFilled) ? false : true); // when eventId is presnt we need to run the value usEffect

  useEffect(() => {
    // first time fill the value; this is for draft blogs where value is already present
    if(!isFirstTime && value) {
      setEditorValue(value);
      setIsFirstTime(true);
    }
  }, [value])
  useEffect(() => {
    setValue(editorValue);
  }, [editorValue]);

  useEffect(() => {
    if(alreadyFilled) {
      setIsFirstTime(false);
    }
  }, [alreadyFilled])

  return (
    <ReactQuill
      rows={3}
      theme="snow"
      value={editorValue}
      readOnly={readOnly}
      onChange={setEditorValue}
      modules={textEditor.modules}
      formats={textEditor.formats}
    />
  );
}

export default SimpleEditor;
