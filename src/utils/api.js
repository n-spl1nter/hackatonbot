import axios from 'axios';
import { ACCESS_TOKEN } from '../config/creds';

axios.defaults.headers.common['Content-Type'] = 'application/json';

const GRAPH_BASE = 'https://graph.facebook.com';
const GRAPH_URL = `${GRAPH_BASE}/v10.0`;

export function sendImage(url, recipientId) {
  const message = {
    attachment: {
      type: 'image',
      payload: {
        url,
        is_reusable: true,
      },
    },
  };

  return sendMessage(message, recipientId);
}

/***
 *
 * @param message
 * @param recipientId
 * @param messaging_type
 * @returns {Promise<AxiosResponse<any>>}
 */
export function sendMessage(message, recipientId, messaging_type = 'RESPONSE') {
  const payload = {
    recipient: { id: recipientId },
    messaging_type,
    message,
  };

  return axios.post(`${GRAPH_URL}/me/messages?access_token=${ACCESS_TOKEN}`, payload);
}

export function getUserProfile(userId) {
  return axios.get(`${GRAPH_URL}/${userId}?fields=first_name,last_name,profile_pic&access_token=${ACCESS_TOKEN}`);
}
