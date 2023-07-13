const { user } = require("../../modal/user/user.modal");
const { searchUserByEmail } = require("../../services/user.services");
const getUsers = (req, res) => {
  try {
    res.status(200).send(user);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
};

const searchAUserByEmail = (req, res) => {
  const { email } = req.body;
  if (searchUserByEmail(email)) {
    user.filter();
  }
  try {
  } catch (err) {}
};
module.exports = {
  getUsers: getUsers,
};
