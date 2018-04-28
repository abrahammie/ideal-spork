const express = require('express');
const path = require('path');
var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../client')));

app.listen(PORT, () => {
  console.log('Running on port:', PORT);
});