import messageProcess from '../data/messageProcess';


async function handler(req, res) {
  const body = req.body;

  if (body.object !== 'page') {
    res.sendStatus(404);
    return;
  }

  const webhookEvent = body.entry[0].messaging[0];
  // console.log('webhook_event---', webhookEvent);
  await messageProcess(webhookEvent, req, res);

  res.status(200).send('EVENT_RECEIVED');
}

const middlewares = [];

export default {
  middlewares,
  handler,
};
