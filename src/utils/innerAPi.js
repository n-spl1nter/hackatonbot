import axios from 'axios';
import { getUserProfile } from './api';

const BASE_URL = 'http://localhost:5000/api';

export async function agree(userId, agreeId) {
  const res = await axios.get(`${BASE_URL}/event/${agreeId}/status?agree=true`);

  return res.data;
}

export async function getNextActivityByType (event) {
  const { sender: { id } } = event;
  const res = await axios.get(`${BASE_URL}/user/${id}/get_event`);
  const data = res.data;
  if (data.type === 'no_event') {
    return data;
  }
  const user = await getUserProfile(data.user_id);

  return {
    user,
    eventId: data.id_event,
  };
}

/**
 *
 * @param event
 * @returns {Promise<AxiosResponse<any>>}
 */
export function register(event) {
  const { sender: { id } } = event;

  return axios.get(`${BASE_URL}/user/${id}/register`);
}

export async function getMatches(userId) {
  const res = await axios.get(`${BASE_URL}/user/${userId}/matches`);
  return res.data.users;
}
