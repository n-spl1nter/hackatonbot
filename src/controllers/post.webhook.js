function handler(req, res) {
  let body = req.body;

  if (body.object === 'page') {

    body.entry.forEach(function(entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
}

const middlewares = [];

export default {
  middlewares,
  handler,
};
