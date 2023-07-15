const { user } = require("../modal/user/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function searchUserByEmail(email) {
  const id = user.reduce(function (acc, current) {
    acc = email;
    if (current.email === acc) {
      return true;
    } else {
      return false;
    }
  }, email);
  return id;
}

async function loginUser(email, password) {
  const data = user.find((u) => u.email === email);
  if (data) {
    const pass = await bcrypt.compare(password, data.password);
    if (pass) {
      return data;
    } else {
      return { message: "Password is incorrect" };
    }
  }
}

function getUserById(id) {
  const data = user.find((u) => u.userId === id);
  if (data) {
    return data;
  }
}

function verifyUser(token) {
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
}

function getAllUsersExcept(id) {
  const data = user.filter((u) => u.userId !== id);
  return data;
}

module.exports = {
  loginUser: loginUser,
  searchUserByEmail: searchUserByEmail,
  getUserById,
  getAllUsersExcept,
  verifyUser,
};
