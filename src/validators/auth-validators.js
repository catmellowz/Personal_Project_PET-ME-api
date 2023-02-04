const Joi = require('joi');
const validate = require('./validate');

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'any.required': 'first name is required',
    'string.empty': 'first name is required',
    'string.base': 'first name must be a string',
  }),
  lastName: Joi.string().trim().required().messages({
    'any.required': 'last name is required',
    'string.empty': 'last name is required',
    'string.base': 'last name must be a string',
  }),
  emailOrUsername: Joi.alternatives()
    .try(Joi.string().email({ tlds: false }), Joi.string())

    .messages({
      'alternatives.match':
        'must be valid email address or username number',
    })
    .strip(),
  password: Joi.string()
    .alphanum()
    .min(6)
    .required()
    .trim()
    .messages({
      'string.empty': 'password is required',
      'string.alphanum': 'password must be a number or alphabet',
      'string.min': 'password must have at least 6 charaters',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .trim()
    .messages({
      'any.only': 'password and confirm password did not match',
      'string.empty': 'confirm password is required',
    })
    .strip(),
  email: Joi.forbidden().when('emailOrUsername', {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref('emailOrUsername')),
  }),
  username: Joi.forbidden().when('emailOrUsername', {
    is: Joi.string(),
    then: Joi.string().default(Joi.ref('emailOrUsername')),
  }),
});

exports.validateRegister = validate(registerSchema);
// exports.validateLogin = validate(loginSchema);

const loginSchema = Joi.object({
  emailOrUsername: Joi.string().required(),
  password: Joi.string().required(),
});

exports.validateLogin = validate(loginSchema);
