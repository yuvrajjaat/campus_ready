const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const fs = require('fs');
const Conversion = require('../models/Conversion');
const pdf = require('pdf-parse'); // for PDF parsing
const config = require('../config');

// Setup multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /upload - upload PDF and convert to XML
router.post('/upload', auth, upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    let data = await pdf(dataBuffer);
    // Basic conversion: heuristic wrapping text lines in XML tags.
    let lines = data.text.split('\n').filter(line => line.trim() !== '');
    let xmlContent = '<document>\n';
    lines.forEach(line => {
      // Simple heuristic: if the line is all uppercase (and longer than a few characters), treat it as a header.
      if (line.trim() === line.trim().toUpperCase() && line.trim().length > 3) {
        xmlContent += `  <h1>${line.trim()}</h1>\n`;
      } else {
        xmlContent += `  <p>${line.trim()}</p>\n`;
      }
    });
    xmlContent += '</document>';

    // Save conversion record to the database
    const conversion = new Conversion({
      user: req.user,
      originalFileName: req.file.originalname,
      xmlContent,
      pdfPath: req.file.path
    });
    await conversion.save();
    res.json({ conversion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Conversion failed' });
  }
});

// GET / - get all conversions for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const conversions = await Conversion.find({ user: req.user }).sort({ createdAt: -1 });
    res.json({ conversions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch conversions' });
  }
});

// GET /:id - get a specific conversion by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const conversion = await Conversion.findOne({ _id: req.params.id, user: req.user });
    if (!conversion) return res.status(404).json({ message: 'Conversion not found' });
    res.json({ conversion });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch conversion' });
  }
});

module.exports = router;
