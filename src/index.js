const app = require('./app');
const webhookController = require('./controllers/webhook');

app.post('/webhook', ...webhookController.middlewares, webhookController.handler);

app.get('*', (req, res) => {
  res.send('11');
});
