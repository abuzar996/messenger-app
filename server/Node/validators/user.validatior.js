const Joi = require("joi");

const schema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(10).required(),
  lastname: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6).required(),
});
const loginBody = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const searhUserByNameSchema = Joi.object({ name: Joi.string().required() });

const searhUserByIdSchema = Joi.object({
  userId: Joi.string().required(),
});

const searhUserByEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
module.exports = {
  createUser: schema,
  loginBody: loginBody,
  searhUserByEmailSchema: searhUserByEmailSchema,
  searhUserByNameSchema: searhUserByNameSchema,
  searhUserByIdSchema: searhUserByIdSchema,
};
