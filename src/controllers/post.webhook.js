import { sendMessage } from '../utils/api';

const testMessage = {
  "text": "Тестовое сообщения с выбором:",
  "quick_replies":[
    {
      "content_type":"text",
      "title":"вариант 1",
      "payload":"var1",
    },{
      "content_type":"text",
      "title":"Вариант 2",
      "payload":"var2",
    }
  ]
};

async function handler(req, res) {
  const body = req.body;

  if (body.object === 'page') {
    const webhook_event = body.entry.messaging[0];
    const sender_psid = webhook_event.sender.id;
    // await sendMessage({ "text": "Тестовое сообщение" }, sender_psid);
    await sendMessage(testMessage, sender_psid);
    res.status(200).send('EVENT_RECEIVED');
    return;
  }

  res.sendStatus(404);
}

const middlewares = [];

export default {
  middlewares,
  handler,
};
