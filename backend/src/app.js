const express = require('express');
const cors = require('cors');
const claimsRouter = require('./routes/claims');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/claims', claimsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;