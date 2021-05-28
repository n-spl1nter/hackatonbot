import { getNextActivityByType } from '../utils/innerAPi';
import { sendMessage, sendImage } from '../utils/api';
import * as constants from '../constants';

async function getActivityMessage(event, type) {
  const { sender: { id } } = event;
  await sendMessage({ text: 'Сейчас поищем...' }, id);
  const data = await getNextActivityByType(event, type);
  await sendImage('https://randomuser.me/api/portraits/men/75.jpg', id);
  const text = `${data.eventName} (${data.eventDate}). Организатор ${data.user.name}.`;
  await sendMessage({ text }, id);
  const replyMessage = {
    text: 'Хочешь посетить мероприятие?',
    "quick_replies": [
      {
        "content_type":"text",
        "title": "Да, хочу!",
        "payload": constants.ACCEPT_EVENT,
      },
      {
        "content_type":"text",
        "title": "Неа...",
        "payload": type,
      }
    ]
  };
  await sendMessage(replyMessage, id);

  return null;
}

const messages = {
  [constants.EVENT_ONLINE_NEXT]: (event) => getActivityMessage(event, constants.EVENT_ONLINE_NEXT),
  [constants.EVENT_OFFLINE_NEXT]: (event) => getActivityMessage(event, constants.EVENT_OFFLINE_NEXT),
};

export default async function quickReply(event) {
  const { sender: { id }, message: { quick_reply: { payload } } } = event;
  const responseExpression = messages[payload];
  const message = typeof responseExpression === 'function'
    ? await responseExpression(event)
    : responseExpression;
  if (!message) {
    return;
  }

  return sendMessage(message, id);
}
