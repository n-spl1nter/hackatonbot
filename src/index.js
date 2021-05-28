import app from './app';
import postWebhook from './controllers/post.webhook';
import getWebhook from './controllers/get.webhook';

app.post('/webhook', ...postWebhook.middlewares, postWebhook.handler);
app.get('/webhook', ...getWebhook.middlewares, getWebhook.handler);

app.get('*', (req, res) => {
  res.send('ok');
});
