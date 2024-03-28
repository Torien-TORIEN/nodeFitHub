const Joi = require('joi');

const userValidation = Joi.object({
  nom: Joi.string().required(),
  email: Joi.string().email().required(),
  motdepasse: Joi.string().min(6).required(),
});

const validateUser = (req, res, next) => {
  const { error } = userValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = validateUser;
