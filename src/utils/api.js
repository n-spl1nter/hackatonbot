const axios = require('axios');
const { ACCESS_TOKEN } = require('../config/creds');

axios.defaults.baseURL = 'https://graph.facebook.com/v2.9';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;

const api = {
  get: (...args) => {
    return axios.get(...args);
  },
  post: (...args) => {
    return axios.post(...args);
  },
}

module.exports = api;
