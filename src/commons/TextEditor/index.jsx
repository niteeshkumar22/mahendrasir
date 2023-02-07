import React, {useState, useEffect} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./style.css";

export const Editor = (props) => {
  const { value, setValue, blogId } = props;

  const [editorValue, setEditorValue] = useState(value);
  const [isFirstTime, setIsFirstTime] = useState(blogId ? false : true); // when blogId is presnt we need to run the value usEffect

  useEffect(() => {
    // first time fill the value; this is for draft blogs where value is already present
    if(!isFirstTime && value) {
      setEditorValue(value);
      setIsFirstTime(true);
    }
  }, [value])

  useEffect(() => {
   // update value prop when editor state changes
    if(isFirstTime && editorValue && editorValue.length > 0 ) {
        setValue(editorValue);
    }

  }, [editorValue]);

  return (
    <div className="fancy-text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={setEditorValue}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;