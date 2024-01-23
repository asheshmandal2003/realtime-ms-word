import { Doc } from "../models/doc.js";
import { User } from "../models/user.js";

export const createDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const newDoc = new Doc();
    newDoc.accessList.push(user._id);
    user.docs.unshift(newDoc._id);
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
    const { docId } = req.params;
    const doc = await Doc.findById(docId).populate("accessList");
    for (let people of doc.accessList) {
      await people.updateOne({ $pull: { docs: docId } });
    }
    await Doc.findByIdAndDelete(docId);
    return res.status(200).json({ message: "Document deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const updateDocName = async (req, res) => {
  try {
    const { docId } = req.params;
    await Doc.findByIdAndUpdate(docId, {
      docName: req.body.docName,
    });
    return res.status(204).json({ message: "Updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const shareDoc = async (req, res) => {
  try {
    const { docId } = req.params;
    const { email } = req.body;
    const doc = await Doc.findById(docId);
    const user = await User.findByUsername(email);
    if (!user) return res.status(404).json({ message: "User doesn't exist!" });
    const haveTheDoc = await doc.accessList.some(function (id) {
      return id.equals(user._id);
    });
    if (haveTheDoc)
      return res
        .status(404)
        .json({ message: "Document has already shared to the user!" });
    doc.accessList.unshift(user._id);
    user.docs.unshift(docId);
    await doc.save();
    await user.save();
    return res.status(200).json({ message: "Document shared successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getDocDetails = async(req, res)=>{
  try {
    const {docId} = req.params
    const doc = await Doc.findById(docId)
    console.log(doc)
    return res.status(200).json({ name: doc.docName, accessList: doc.accessList });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong!" });
  }
}
