//validation using @hapi/joi
const Joi = require('@hapi/joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
        username: Joi.string().min(6).required(),
        age: Joi.number().required()
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().required().min(6),
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
