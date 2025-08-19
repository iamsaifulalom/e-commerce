const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  term: String,
  resultCount: Number,
  times: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SearchHistory', searchSchema);