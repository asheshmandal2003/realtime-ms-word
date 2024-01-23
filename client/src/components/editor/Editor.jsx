import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./Editor.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import EditorNav from "./EditorNav";
import ShareModal from "./Modal";
import { useSelector } from "react-redux";
import axios from "axios";

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
  ["link", "image", "video", "formula"],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

const INTERVAL = 2000;

export default function Editor() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [webSocket, setWebSocket] = useState(undefined);
  const [quill, setQuill] = useState(undefined);
  const { documentId } = useParams();
  const id = useSelector((state) => state.user._id);

  useEffect(() => {
    async function getDocDetails() {
      await axios({
        method: "GET",
        url: `${
          import.meta.env.VITE_BACKEND_URL
        }/user/${id}/document/${documentId}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
    getDocDetails();
  }, []);

  useEffect(() => {
    // const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    // setWebSocket(socket);
    // return () => socket.disconnect();
  });

  // useEffect(() => {
  //   if (webSocket === undefined || quill === undefined) return;
  //   webSocket.once("load-document", (doc) => {
  //     quill.setContents(doc.content);
  //     quill.enable();
  //   });
  //   webSocket.emit("get-document", documentId);
  // }, [webSocket, quill, documentId]);

  // useEffect(() => {
  //   if (webSocket === undefined || quill === undefined) return;
  //   const interval = setInterval(() => {
  //     webSocket.emit("save-changes", quill.getContents());
  //   }, INTERVAL);
  //   return () => clearInterval(interval);
  // }, [webSocket, quill]);

  // useEffect(() => {
  //   if (webSocket === undefined || quill === undefined) return;
  //   function handleChange(delta, oldDelta, source) {
  //     if (source !== "user") return;
  //     webSocket.emit("send-changes", delta);
  //   }
  //   quill.on("text-change", handleChange);
  //   return () => quill.off("text-change", handleChange);
  // }, [webSocket, quill]);

  // useEffect(() => {
  //   if (webSocket === undefined || quill === undefined) return;
  //   function handleChange(delta) {
  //     quill.updateContents(delta);
  //   }
  //   webSocket.on("receive-changes", handleChange);
  //   return () => webSocket.off("receive-changes", handleChange);
  // }, [webSocket, quill]);

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
    quillObj.disable();
    quillObj.setText("Loading...");
    setQuill(quillObj);
  }, []);

  return (
    <>
      <EditorNav id={id} docId={documentId} handleOpen={handleOpen} />
      <div className="container" ref={containerRef}></div>;
      <ShareModal
        id={id}
        docId={documentId}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}
