import express from "express";
import {
  createDoc,
  deleteDoc,
  getDocDetails,
  getDocs,
  shareDoc,
  updateDocName,
} from "../controllers/doc.js";

const router = express.Router();

router.route("/:id/document/create").post(createDoc);
router.route("/:id/document").get(getDocs);
router
  .route("/:id/document/:docId")
  .get(getDocDetails)
  .patch(updateDocName)
  .delete(deleteDoc);
router.route("/:id/document/:docId/share").post(shareDoc);

export default router;
