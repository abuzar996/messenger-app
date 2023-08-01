let { user } = require("../modal/user/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const searchUserByEmail = (email) => {
  const id = user.reduce(function (acc, current) {
    acc = email;
    if (current.email === acc) {
      return true;
    } else {
      return false;
    }
  }, email);
  return id;
};

const loginUser = async (email, password) => {
  const data = user.find((u) => u.email === email);
  if (data) {
    const pass = await bcrypt.compare(password, data.password);
    if (pass) {
      return data;
    } else {
      return { message: "Password is incorrect" };
    }
  }
};

const getUserById = (id) => {
  const data = user.find((u) => u.userId === id);
  if (data) {
    return data;
  }
};

const verifyUser = (token) => {
  const user = jwt.verify(token, "secretKey", (err, data) => {
    if (err) {
      return { message: err.message };
    } else {
      return data;
    }
  });
  if (user.message) {
    return { err: user.message };
  } else {
    return user;
  }
};
const searchAUserByIdcheck = (userId) => {
  const data = user.find((u) => u.userId === +userId);
  return data;
};

const getAllUsersExcept = (id) => {
  const data = user
    .filter((u) => u.userId !== id)
    .map(({ userId, firstname, lastname, email }) => {
      return { userId, firstname, lastname, email };
    });
  return data;
};

const findUsersByName = (name, firstname) => {
  const users = user.filter((u) => {
    return u.firstname.includes(name) && u.firstname !== firstname;
  });
  return users;
};

const checkDuplicates = (list, id) => {
  if (list) {
    let duplicate = list.find((friends) => friends === id);
    if (duplicate) {
      return true;
    }
  }
  return false;
};
const addUserToFriend = (friendId, userId) => {
  let newArray = user.map((u) => {
    if (u.userId === userId) {
      let duplicate = checkDuplicates(u.friends, friendId);
      return !duplicate
        ? {
            ...u,
            friends: u.friends ? [...u.friends, friendId] : [friendId],
          }
        : u;
    }
    return u;
  });
  user = [...newArray];
};

const addUserBack = (friendId, userId) => {
  let newArray = user.map((u) => {
    if (u.userId === friendId) {
      let duplicate = checkDuplicates(u.friends, userId);
      return !duplicate
        ? { ...u, friends: u.friends ? [...u.friends, userId] : [userId] }
        : u;
    }
    return u;
  });
  user = [...newArray];
};

const fetchFriends = (userId) => {
  let data = user.find((u) => u.userId === userId);
  if (data.friends && data.friends.length > 0) {
    let allFriends = data.friends;
    const allFriendsData = allFriends
      .map((userFriends) => user.find(({ userId }) => userId === userFriends))
      .map((result) => ({
        userId: result.userId,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
      }));

    return allFriendsData;
  }

  return [];
};

const fetchNonFriends = (userId, allUsers) => {
  let userData = user.find((u) => u.userId === userId);
  if (userData) {
    if (userData.friends) {
      userData.friends.forEach((friend) => {
        let index = allUsers.findIndex((u) => u.userId === friend);
        if (index !== -1) {
          allUsers.splice(index, 1);
        }
      });
      return allUsers;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

const getFriendList = (userId) => {
  const friends = user.find((u) => u.userId === userId);
  if (friends) {
    return friends.friends ? friends.friends : [];
  }
  return [];
};

const checkIfTheyAreFriends = (friendList, friendId) => {
  const friends = friendList.find((friend) => friend === friendId);
  return friends;
};
const removeFriendFromUser = (userId, friendId) => {
  try {
    let userData = user.find((u) => u.userId === userId);
    if (userData) {
      let index = userData.friends.indexOf(friendId);
      if (index !== -1) {
        userData.friends.splice(index, 1);
        user = user.map((u) => (u.userId === userId ? userData : u));
        return true;
      }
      return false;
    }
    return false;
  } catch {
    return false;
  }
};
const removeuserFromFriend = (userId, friendId) => {
  try {
    let friendData = user.find((u) => u.userId === friendId);
    if (friendData) {
      let index = friendData.friends.indexOf(userId);
      if (index !== -1) {
        friendData.friends.splice(index, 1);
        user = user.map((u) => (u.userId === friendId ? friendData : u));
        return true;
      }
      return false;
    }
    return false;
  } catch {
    return false;
  }
};
module.exports = {
  loginUser: loginUser,
  searchUserByEmail: searchUserByEmail,
  getUserById,
  findUsersByName,
  getAllUsersExcept,
  verifyUser,
  searchAUserByIdcheck: searchAUserByIdcheck,
  addUserToFriend,
  addUserBack,
  fetchNonFriends,
  fetchFriends,
  getFriendList,
  checkIfTheyAreFriends,
  removeFriendFromUser,
  removeuserFromFriend,
};
