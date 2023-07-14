const checkEmailRequest = (req, res, next) => {
  if (req?.params?.email) {
    next();
  } else {
    res.status(422).send({
      message: "email field is missing ",
    });
  }
};

module.exports = { checkEmailRequest: checkEmailRequest };
