const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const authRoutes = require('./routes/auth');
const conversionRoutes = require('./routes/conversion');

const app = express();

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/conversions', conversionRoutes);

// Serve static files (if needed) from the upload directory
app.use('/uploads', express.static(path.join(__dirname, config.UPLOAD_DIR)));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
