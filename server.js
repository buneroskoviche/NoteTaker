// Package requirements
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

// Parse data with express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });