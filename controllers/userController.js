import User from "../models/User.js";
import UserToken from "../models/UserToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleErrors = (err) => {
  let errors = [];

  if (err.code === 11000) {
    errors.push({ message: err.message });
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors.push({ message: properties.message });
    });
  }

  return errors;
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    if (user) {
      res
        .status(201)
        .json({ message: `Data inserted with id ${user._id}`, data: user });
    } else {
      res.status(400).json({ message: "Data not inserted" });
    }
  } catch (err) {
    res.status(400).json(handleErrors(err));
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Invalid Credential");
    }

    let hashPassword = user.password;
    let userId = user.id;

    if (await bcrypt.compare(password, hashPassword)) {
      const accessToken = jwt.sign(email, process.env.AUTH_TOKEN_SECRET);

      saveToken(userId, accessToken);
      res.status(200).json({
        message: "Successfully authenticated",
        token: accessToken,
      });
    } else {
      res.status(400).json({ message: "Invalid Credential" });
    }
  } catch (err) {
    res.status(400).json(handleErrors(err));
  }
};

const saveToken = async (userId, access_token) => {
  const token = await UserToken.findOne({
    userId: userId,
    token: access_token,
  });

  if (!token) {
    await UserToken.create({
      userId: userId,
      token: access_token,
    });
  }
};

const logoutUser = async (req, res) => {
  const { access_token } = req.body;

  try {
    const user = await UserToken.findOneAndDelete({
      token: access_token,
    });

    if (user) {
      res.status(200).json({ message: "Log out successfully" });
    } else {
      res.status(400).json({ message: "Failed log out" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid parameters" });
  }
};

export { createUser, loginUser, logoutUser };
