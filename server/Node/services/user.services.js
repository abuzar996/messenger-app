const { user } = require("../modal/user/user.modal");

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

module.exports = {
  searchUserByEmail: searchUserByEmail,
};
