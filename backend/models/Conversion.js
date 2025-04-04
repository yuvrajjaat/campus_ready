const mongoose = require('mongoose');

const ConversionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalFileName: { type: String },
  xmlContent: { type: String },
  pdfPath: { type: String }, // file path to original PDF
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversion', ConversionSchema);
