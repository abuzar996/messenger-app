const { user } = require("../../modal/user/user.modal");
const {
  loginUser,
  getUserById,
  getAllUsersExcept,
  findUsersByName,
  addUserToFriend,
  addUserBack,
  fetchFriends,
  fetchNonFriends,
  getFriendList,
  checkIfTheyAreFriends,
  removeFriendFromUser,
  removeuserFromFriend,
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
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await loginUser(email, password);
    if (user) {
      if (user.message) {
        res.status(401).json({ message: user.message });
      } else if (!user.message) {
        let token = jwt.sign(user, "secretKey");
        res.send({ authToken: token, email: email });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const searchUserById = (req, res) => {
  const { userId } = req.params;
  const { user: users } = req.body;
  const user = getUserById(+userId);
  if (user) {
    res.status(200).send({
      user: {
        userId: user.userId,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      searchedBy: users.firstname,
    });
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

const getUserByName = (req, res) => {
  const { name } = req.params;
  const { firstname } = req.body;
  try {
    const usersList = findUsersByName(name, firstname);
    if (usersList.length > 0) {
      res.status(200).send({ users: usersList, searchedBy: firstname });
    } else {
      res.status(404).send({ message: "No users found" });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const addUserToFriendList = (req, res) => {
  const { friendId, user: users } = req.body;
  try {
    addUserToFriend(+friendId, users.userId);
    addUserBack(+friendId, users.userId);
    res.status(200).send({ message: "Successfully Added" });
  } catch (err) {
    res.send({ message: err.message });
  }
};

const getUserFriends = (req, res) => {
  const { user: users } = req.body;
  try {
    let friends = fetchFriends(users.userId);

    if (friends) {
      return res.status(200).send({ friends });
    }

    res.status(404).send({ message: "Not Found" });
  } catch (err) {
    res.send({ message: err.message });
  }
};

const getNonFriends = (req, res) => {
  const { user: users } = req.body;
  try {
    const freindList = fetchFriends(users.userId);
    const allUsers = getAllUsersExcept(users.userId).map(
      ({ userId, firstname, lastname, email }) => {
        return {
          userId,
          firstname,
          lastname,
          email,
        };
      }
    );
    if (freindList && freindList.length > 0) {
      const usersNonFriends = fetchNonFriends(users.userId, allUsers);
      res.status(200).send({ users: usersNonFriends });
    } else {
      res.status(200).send({ users: allUsers });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

const checkIfUserHasFriend = (req, res) => {
  const { friendId } = req.params;
  const { user } = req.body;
  try {
    const friendList = getFriendList(user.userId);
    if (friendList.length > 0 && friendList) {
      let value = checkIfTheyAreFriends(friendList, +friendId);
      if (value) {
        res.status(200).send({ friends: true });
      } else {
        res.status(400).send({ friends: false });
      }
    } else {
      res.send({ friends: false });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};
const postUnfriendUser = (req, res) => {
  const { friendId, user } = req.body;
  try {
    let friendRemove = removeFriendFromUser(user.userId, friendId);
    let userRemove = removeuserFromFriend(user.userId, friendId);
    if (friendRemove && userRemove) {
      res.status(200).send({ message: "User Removed Succesfully" });
    } else {
      res.status(404).send({ message: "Something went Wrong!" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};
module.exports = {
  getUsers: getUsers,
  searchAUserByEmail: searchAUserByEmail,
  createNewUser: createNewUser,
  userlogin: userlogin,
  searchUserById: searchUserById,
  getAllUsers: getAllUsers,
  getUserByName: getUserByName,
  addUserToFriendList: addUserToFriendList,
  getUserFriends: getUserFriends,
  getNonFriends,
  checkIfUserHasFriend,
  postUnfriendUser,
};
