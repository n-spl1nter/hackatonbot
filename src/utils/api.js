import axios from 'axios';
import { ACCESS_TOKEN } from '../config/creds';

axios.defaults.baseURL = 'https://graph.facebook.com/v10.0';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export function sendMessage(message, recipientId, messaging_type = 'RESPONSE') {
  const payload = {
    recipient: {
      id: recipientId,
    },
    messaging_type,
    message,
  };

  return axios.post(`/me/messages?access_token=${ACCESS_TOKEN}`, payload);
}
