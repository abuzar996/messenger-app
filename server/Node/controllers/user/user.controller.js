const { user } = require("../../modal/user/user.modal");
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
module.exports = {
  getUsers: getUsers,
  searchAUserByEmail: searchAUserByEmail,
};
