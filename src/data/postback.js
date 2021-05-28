import { sendMessage } from '../utils/api';
import * as constants from '../constants';

const messages = {
  SEARCH: {
    text: 'Выбери тип мероприятия',
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Онлайн",
        "payload": constants.EVENT_ONLINE_NEXT,
      },{
        "content_type":"text",
        "title": "Оффлайн",
        "payload": constants.EVENT_OFFLINE_NEXT,
      }
    ]
  },
  MATCHES: { text: 'Выбрны совпадения' },
  SETTINGS: { text: 'Выбраны настройки' },
  START: { text: 'Добро пожаловать в OmniFriend! Здесь ты сможешь найти единомышленников, с которыми хорошо проведешь время.' },

}

/**
 *
 * @param event
 * @returns {Promise<AxiosResponse<*>| vod>}
 */
export default async function postback(event) {
  const { sender: { id }, postback: { payload } } = event;
  const responseExpression = messages[payload];
  const message = typeof responseExpression === 'function'
    ? await responseExpression()
    : responseExpression;
  if (!message) {
    return;
  }

  return sendMessage(message, id);
}
