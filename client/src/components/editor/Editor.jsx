import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./Editor.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],

  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

export default function Editor() {
  const [webSocket, setWebSocket] = useState(undefined);
  const [quill, setQuill] = useState(undefined);
  const {documentId} = useParams()

  useEffect(()=>{
    if(webSocket === undefined || quill === undefined) return
    webSocket.once("load-document", doc => {
        quill.setContents(doc)
        quill.enable()
    })
    webSocket.emit("get-document", documentId)
  },[webSocket, quill, documentId])

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    console.log("connected");
    setWebSocket(socket);
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (webSocket === undefined || quill === undefined) return;
    function handleChange(delta, oldDelta, source) {
      if (source !== "user") return;
      webSocket.emit("send-changes", delta);
    }
    quill.on("text-change", handleChange);
    return () => quill.off("text-change", handleChange);
  }, [webSocket, quill]);

  useEffect(() => {
    if (webSocket === undefined || quill === undefined) return;
    function handleChange(delta) {
      quill.updateContents(delta);
    }
    webSocket.on("receive-changes", handleChange);
    return () => webSocket.off("receive-changes", handleChange);
  }, [webSocket, quill]);

  const containerRef = useCallback((container) => {
    if (container === null) return;
    container.innerHTML = "";
    const editor = document.createElement("div");
    container.append(editor);
    const quillObj = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
    quillObj.disable()
    quillObj.setText("Loading...")
    setQuill(quillObj);
  }, []);

  return <div className="container" ref={containerRef}></div>;
}
