import app from './app';
import webhookController from './controllers/webhook';

app.post('/webhook', ...webhookController.middlewares, webhookController.handler);

app.get('*', (req, res) => {
  res.send('112');
});
