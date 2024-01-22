import express from "express";
import { createDoc, deleteDoc, getDocs } from "../controllers/doc.js";

const router = express.Router();

router.route("/:id/document/create").post(createDoc)
router.route("/:id/document").get(getDocs)
router.route("/:id/document/:docId").delete(deleteDoc)

export default router;
