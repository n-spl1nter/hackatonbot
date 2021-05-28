function handler(req, res) {
  res.send('ok');
}

const middlewares = [];

module.exports = {
  middlewares,
  handler,
};
