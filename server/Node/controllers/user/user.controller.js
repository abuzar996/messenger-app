const { user } = require("../../modal/user/user.modal");
const {
  loginUser,
  getUserById,
  getAllUsersExcept,
} = require("../../services/user.services");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const getUsers = (req, res) => {
  try {
    res.status(200).send(user);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
};

const searchAUserByEmail = (req, res) => {
  const { email } = req.params;

  try {
    const value = user.find((us) => us.email === email);

    if (value) {
      res.status(200).send({
        userId: value.userId,
        firstname: value.firstname,
        lastname: value.lastname,
        email: value.email,
      });
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const createNewUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = salt && (await bcrypt.hash(password, salt));
    if (!hashPassword) {
      res.status(500).send({ message: "Something went wrong" });
    }
    user.push({
      userId: user.length + 1,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashPassword,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const userlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    if (user) {
      if (user.message) {
        res.status(401).json(user.message);
      } else if (!user.message) {
        let token = jwt.sign(user, "secretKey");
        res.send(token);
      }
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const searchUserById = (req, res) => {
  const { userId } = req.params;
  const searcher = req.body;
  const user = getUserById(+userId);
  if (user) {
    res.status(200).send({ user: user, searchedBy: searcher.firstname });
  } else {
    res.status(404).send({ message: "User not found" });
  }
};

const getAllUsers = (req, res) => {
  const searcher = req.body;
  try {
    const allUsers = getAllUsersExcept(searcher.userId);
    if (allUsers) {
      res.status(200).send({ users: allUsers, searchedBy: searcher.firstname });
    } else {
      res.status(404).send({ message: "Cannot find users" });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getUsers: getUsers,
  searchAUserByEmail: searchAUserByEmail,
  createNewUser: createNewUser,
  loginUser: userlogin,
  searchUserById: searchUserById,
  getAllUsers: getAllUsers,
};
