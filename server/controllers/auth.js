import { Doc } from "../models/doc.js";
import { User } from "../models/user.js";

export const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const newUser = new User({
    first_name,
    last_name,
    email,
  });
  try {
    const registeredUser = await User.register(newUser, password);
    req.logIn(registeredUser, async (err) => {
      if (err) return err;
      res.status(201).json({
        message: "You're succssfully registered!",
        user: registeredUser,
      });
    });
  } catch (error) {
    res.status(500).json({ message: `${error.message}!` });
  }
};

export const signin = async (req, res) => {
  const user = req.user;
  res
    .status(200)
    .json({ message: "You're succssfully logged in!", user: user });
};

export const logout = async (req, res) => {
  req.logOut(() => {
    try {
      res.status(200).json({ message: "You're logged out!" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error!" });
    }
  });
};

export const deleteAc = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate("docs")
      .populate("createdDocs");
    if (user.docs.length > 0) {
      user.docs.map(async (doc) => {
        await doc.updateOne({ $pull: { accessList: { id } } });
      });
    }
    if (user.createdDocs.length > 0) {
      user.createdDocs.map(async (doc) => {
        const foundDoc = await Doc.findById(doc._id).populate(
          "accessList.userId"
        );
        if (foundDoc.accessList.length > 0) {
          foundDoc.accessList.map(async (people) => {
            if (people.userId) {
              await people.userId.updateOne({ $pull: { docs: doc._id } });
            }
          });
        }
      });
      user.createdDocs.map(async (doc) => {
        await Doc.findByIdAndDelete(doc._id);
      });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Account Deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
