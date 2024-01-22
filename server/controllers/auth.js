import { User } from "../models/user.js";

export const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const newUser = new User({
    first_name, last_name, email
  });
  try {
    const registeredUser = await User.register(newUser, password);
    req.logIn(registeredUser, async (err) => {
      if (err) return err;
      res.status(201).json({message: "You're succssfully registered!", user: registeredUser});
    });
  } catch (error) {
    res.status(500).json({ message: `${error.message}!` });
  }
};

export const signin = async (req, res) => {
    const user = req.user;
    res.status(200).json({message: "You're succssfully logged in!", user: user});
};

