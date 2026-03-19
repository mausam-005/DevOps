const express = require('express');
const sum = require('./src/sum');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// simple static frontend
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// basic api integration
app.post('/sum', (req, res) => {
  const { a, b } = req.body;
  
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'both a and b must be numbers' });
  }

  const result = sum(a, b);
  return res.json({ result });
});

let server;

// This wrapper helps for integration testing
if (require.main === module) {
  server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
