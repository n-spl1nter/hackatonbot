import { VERIFY_TOKEN } from '../config/creds';

function handler(req, res) {
  // Parse the query params
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
      return;
    }
  }
  res.sendStatus(403);
}

const middlewares = [];

export default {
  middlewares,
  handler,
};
