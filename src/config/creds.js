const res = require('dotenv').config()
const ACCESS_TOKEN = res.parsed.ACCESS_TOKEN;
const VERIFY_TOKEN = res.parsed.VERIFY_TOKEN;

module.exports = {
  ACCESS_TOKEN,
  VERIFY_TOKEN,
};
