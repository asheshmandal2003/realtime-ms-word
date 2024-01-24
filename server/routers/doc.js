import express from "express";
import {
  changeDocAccessType,
  createDoc,
  deleteDoc,
  getDocDetails,
  getDocs,
  removeAccess,
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
router.route("/:id/document/:docId/change-access").patch(changeDocAccessType);
router
  .route("/:id/document/:docId/people/:userId")
  .delete(removeAccess);

export default router;
