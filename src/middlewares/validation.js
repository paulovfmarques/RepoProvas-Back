const Joi = require("joi");

const uploadSchema = Joi.object({
    title: Joi.string().min(3).required(),
    subject: Joi.string().min(3).required(),
    category: Joi.string().min(2).required(),
    professor: Joi.string().required(),
    url: Joi.string().uri().required()
  })

  const validateUpload = (req, res, next) => {
    if (uploadSchema.validate(req.body).error)
      return res
        .status(422)
        .send(uploadSchema.validate(req.body).error.message);
  
    next();
  };
  
  module.exports = { validateUpload };