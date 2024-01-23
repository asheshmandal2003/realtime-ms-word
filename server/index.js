import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { User } from "./models/user.js";
import authRouter from "./routers/auth.js"
import docRouter from "./routers/doc.js"

const app = express();
const PORT = process.env.PORT || 8080;

async function connection() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then((res) =>
      {
        console.log(res.connection.readyState)
        app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))}
    )
    .catch((err) => console.log(err));
}
connection();

const sessionConfig = {
  name: "Session",
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie:{
    httpOnly: true,
    maxAge: 24*3600000,
    expires: Date.now() + 24*3600000
  }
}

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))
app.use(session(sessionConfig))
app.use(express.urlencoded({extended: true, limit: "30mb"}))
app.use(express.json({limit: "30mb"}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use("/auth", authRouter)
app.use("/user", docRouter)