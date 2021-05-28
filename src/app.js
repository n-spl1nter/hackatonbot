const express = require('express');
const bodyParser = require('body-parser');
const verify = require('./utils/verifySignature');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json({ verify }));
app.listen(port, () => {
  console.log('---', 'app running at', port);
})

module.exports = app;
