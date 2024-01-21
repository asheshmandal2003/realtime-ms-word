import { Server } from "socket.io";
import dotenv from 'dotenv'

dotenv.config()

const io = new Server(3001, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
})

io.on("connection", socket=>{
    socket.on("get-document", documentId=>{
        socket.join(documentId)
        socket.emit("load-document", "")
        socket.on("send-changes", delta=>{
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })
    })
})