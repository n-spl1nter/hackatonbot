import { sendMessage } from '../utils/api';
import registerUser from './registerUser';
import showMatches from './showMatches';
import * as constants from '../constants';

const messages = {
  SEARCH: {
    text: 'Выбери тип общения',
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
  MATCHES: showMatches,
  SETTINGS: { text: 'Тут будут настройки поиска и описание профиля' },
  START: registerUser,

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
    ? await responseExpression(event)
    : responseExpression;
  if (!message) {
    return;
  }

  return sendMessage(message, id);
}
