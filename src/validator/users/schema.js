const Joi = require('joi');

const UserPayloadSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.number().required(),
    fullname: Joi.string().required(),
});

module.exports = { UserPayloadSchema };