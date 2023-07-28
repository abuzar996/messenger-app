const {
  createUser,
  loginBody,
  searhUserByNameSchema,
  searhUserByIdSchema,
  searhUserByEmailSchema,
  addUserToFriendListSchema,
} = require("../validators/user.validatior");

const { user } = require("../modal/user/user.modal");
const {
  verifyUser,
  searchAUserByIdcheck,
} = require("../services/user.services");
const userExists = (req, res, next) => {
  const { email } = req.body;
  const duplicateEmail = user.find((u) => u.email === email);
  if (duplicateEmail) {
    return res
      .status(409)
      .send({ message: "Account with this email already exists" });
  }
  next();
};

const userDoesNotExists = (req, res, next) => {
  const { email } = req.body;
  const duplicateEmail = user.find((u) => u.email === email);
  if (duplicateEmail) {
    next();
  } else {
    return res.status(409).send({
      message: "Account with this email does'nt exists",
    });
  }
};
const validateUserRequestBody = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    await createUser.validateAsync({
      firstname,
      lastname,
      email,
      password,
    });
    next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
const validateAddToFriendList = async (req, res, next) => {
  try {
    const { friendId } = req.body;
    await addUserToFriendListSchema.validateAsync({
      friendId,
    });
    next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
const verifyUsersAvailable = (req, res, next) => {
  const { friendId } = req.body;
  try {
    let user = searchAUserByIdcheck(friendId);
    if (user) {
      next();
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const validateLoginRequestBody = async (req, res, next) => {
  try {
    await loginBody.validateAsync({
      email: req.body.email,
      password: req.body.password,
    });
    next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const isAuthenticated = (req, res, next) => {
  const { token } = req.headers;

  if (token) {
    let user = verifyUser(token);

    if (user) {
      if (user.err) {
        res.send({ message: user.err });
      } else {
        req.body.user = user;
        next();
      }
    }
  } else {
    res.send("Not Authenticated");
  }
};

const validateSearchUserByName = async (req, res, next) => {
  const { name } = req.params;
  try {
    await searhUserByNameSchema.validateAsync({ name });
    next();
  } catch (err) {
    res.status(409).send({ message: err.message });
  }
};
const validateSearchUserByiD = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await searhUserByIdSchema.validateAsync({ userId });
    next();
  } catch (err) {
    res.status(409).send({ message: err.message });
  }
};
const validateSearchUserByEmail = async (req, res, next) => {
  const { email } = req.params;
  try {
    await searhUserByEmailSchema.validateAsync({ email });
    next();
  } catch (err) {
    res.status(409).send({ message: err.message });
  }
};

const checkIfNotYourSelf = (req, res, next) => {
  const { friendId, user } = req.body;
  let selfCheck = +friendId !== user.userId;
  if (selfCheck) {
    next();
  } else {
    res.status(403).send({ message: "You cannot add your self as a friend" });
  }
};
module.exports = {
  validateAddToFriendList,
  validateSearchUserByiD,
  validateUserRequestBody,
  validateLoginRequestBody,
  validateSearchUserByName,
  validateSearchUserByEmail,
  verifyUsersAvailable,
  userExists,
  userDoesNotExists,
  isAuthenticated,
  checkIfNotYourSelf,
};
