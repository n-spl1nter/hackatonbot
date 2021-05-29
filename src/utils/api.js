import axios from 'axios';
import { ACCESS_TOKEN } from '../config/creds';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 10000;

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

export async function getUserAvatar(userId) {
  const avatarResponse = await axios.get(`https://graph.workplace.com/${userId}/picture?fields=height,is_silhouette,width,url&redirect=false&type=large&access_token=${ACCESS_TOKEN}`);
  return avatarResponse.data.data.url;
}

export async function getUserProfile(userId) {
  const [userRes, avatar] = await Promise.all([
    axios.get(`https://graph.workplace.com/v3.0/${userId}?fields=id,first_name,last_name,email,title,organization,division,department,primary_phone,primary_address,picture,link,locale,name,name_format,updated_time,account_invite_time,account_claim_time,external_id,start_date,about,cost_center,claim_link,work_locale,active&access_token=${ACCESS_TOKEN}`),
    getUserAvatar(userId),
  ]);
  const userData = userRes.data;

  return {
    id: userId,
    avatar,
    firstName: userData.first_name,
    title: userData.title,
    department: userData.department,
    link: userData.link,
  };
}

export async function sendMatch(ids) {
  const [user1, user2] =  await Promise.all([
    getUserProfile(ids[0]),
    getUserProfile(ids[1]),
  ]);

  const getMessage = (user) => {
    return {
      text: `Поздравляем! ${user.firstName} из отдела ${user.department} тоже хочет с тобой встретиться! Напиши первым https://adeo.workplace.com/chat/t/${user.id}`,
    };
  };
  await Promise.all([
    sendMessage(getMessage(user2), user1.id),
    sendMessage(getMessage(user1), user2.id),
  ]);
}
