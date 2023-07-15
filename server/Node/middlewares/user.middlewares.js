const { createUser, loginBody } = require("../validators/user.validatior");
const { user } = require("../modal/user/user.modal");
const { verifyUser } = require("../services/user.services");
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
    return res.status(400).send({ message: err });
  }
};

const validateLoginRequestBody = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await loginBody.validateAsync({
      email,
      password,
    });
    next();
  } catch (err) {
    return res.status(400).send({ message: err });
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
        req.body = user;
        next();
      }
    }
  } else {
    res.send("Not Authenticated");
  }
};

module.exports = {
  validateUserRequestBody,
  validateLoginRequestBody,
  userExists,
  userDoesNotExists,
  isAuthenticated,
};
