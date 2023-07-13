const checkEmailRequest = (req, res, next) => {
  const { email } = req.body;
  if (email && email.length > 0) {
    next();
  } else {
    res.status(422).send({
      message: "email field is missing ",
    });
  }
};

module.exports = { checkEmailRequest: checkEmailRequest };
