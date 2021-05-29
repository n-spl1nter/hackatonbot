import { getNextActivityByType, agree } from '../utils/innerAPi';
import { sendMessage, sendImage, sendMatch } from '../utils/api';
import * as constants from '../constants';

const acceptRegexp = new RegExp(`^${constants.ACCEPT_EVENT}`);

async function getActivityMessage(event) {
  const { sender: { id } } = event;
  await sendMessage({ text: 'Сейчас поищем...' }, id);
  const data = await getNextActivityByType(event);
  if (data.type === 'no_event') {
    return {
      text: data.message,
    };
  }

  await sendImage(data.user.avatar, id);
  const text = `${data.user.firstName} (${data.user.department}). ${data.user.title}.`;
  await sendMessage({ text }, id);
  const replyMessage = {
    text: 'Хочешь встретиться?',
    "quick_replies": [
      {
        "content_type":"text",
        "title": "Да, хочу!",
        "payload": `${constants.ACCEPT_EVENT}_${data.eventId}`,
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

async function acceptEvent(event) {
  const { sender: { id }, message: { quick_reply: { payload } } } = event;
  const agreeId = payload.replace(`${constants.ACCEPT_EVENT}_`, '');
  const res = await agree(id, agreeId);
  if (res.type === 'match') {
    await sendMatch([res.users[0].id, res.users[1].id]);
  } else if (res.type === 'ok') {
    await sendMessage({
      text: 'Твоя заявка принята! Дождись одобрения от коллеги.',
    }, id);
    return getActivityMessage(event);
  }

  return null;
}

const messages = {
  [constants.EVENT_ONLINE_NEXT]: (event) => getActivityMessage(event),
  [constants.EVENT_OFFLINE_NEXT]: (event) => getActivityMessage(event),
  [constants.ACCEPT_EVENT]: acceptEvent,
};

export default async function quickReply(event) {
  const { sender: { id }, message: { quick_reply: { payload } } } = event;
  const responseExpression = messages[payload];
  let message = typeof responseExpression === 'function'
    ? await responseExpression(event)
    : responseExpression;

  if (acceptRegexp.test(payload)) {
    console.log('payload---', payload);
    await messages[constants.ACCEPT_EVENT](event);
  }

  if (!message) {
    return;
  }

  return sendMessage(message, id);
}
