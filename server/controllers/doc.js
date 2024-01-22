import { Doc } from "../models/doc.js";
import { User } from "../models/user.js";

export const createDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const newDoc = new Doc();
    user.docs.push(newDoc._id);
    await newDoc.save();
    await user.save();
    return res.status(201).json(newDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getDocs = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("docs");
    return res.status(200).json(user.docs);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const deleteDoc = async (req, res) => {
  try {
    const { id, docId } = req.params;
    const user = await User.findById(id);
    const data = await user.updateOne({ "$pull": {docs: docId} });
    console.log(data)
    await Doc.findByIdAndDelete(docId);
    return res.status(200).json({ message: "Document deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
