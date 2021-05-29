require('dotenv').config();

import app from './app';
import postWebhook from './controllers/post.webhook';
import getWebhook from './controllers/get.webhook';

app.post('/', ...postWebhook.middlewares, postWebhook.handler);
app.get('/', ...getWebhook.middlewares, getWebhook.handler);
