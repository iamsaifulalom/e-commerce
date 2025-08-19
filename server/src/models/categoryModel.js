const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const categorySchema = new mongoose.Schema({
  image: {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  isPromoted: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,  
  },
}, {timestamps : true});

// Mongoose Model
const Category = mongoose.model('Category', categorySchema);

// Joi Validator
const categoryValidationSchema = Joi.object({
  image: Joi.object({
    url: Joi.string().uri().required(),
    publicId: Joi.string().required(),
  }).required(),
  name: Joi.string().trim().required(),
  description: Joi.string().required(),
  isPromoted: Joi.string().valid('yes', 'no').required(),
  parent: Joi.string().optional().allow(null), // Parent is optional
});

// Export Model and Validator
module.exports = { Category, categoryValidationSchema };
