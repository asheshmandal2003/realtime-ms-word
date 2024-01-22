import { Server } from "socket.io";
import dotenv from "dotenv";
import { Doc } from "./models/doc.js";
import mongoose from "mongoose";

dotenv.config();

await mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log(res.connection.readyState))
  .catch((err) => console.log(err.message));

const io = new Server(3001, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const content = await findOrCreateDoc(documentId);
    socket.join(documentId);
    socket.emit("load-document", content);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-changes", async (changes) => {
      await Doc.findByIdAndUpdate(documentId, {content: changes});
    });
  });
});

async function findOrCreateDoc(id) {
  if (id === undefined) return;
  const doc = await Doc.findById(id);
  if (doc) return doc;
    return await Doc.create({_id: id, content: ""})
}
