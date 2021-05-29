import { sendMessage, getUserProfile } from '../utils/api';
import { getMatches } from '../utils/innerAPi';

export default async function showMatches(event) {
  const { sender: { id } } = event;
  const matches = await getMatches(id);
  if (matches.length === 0) {
    return { text: 'У тебя пока нет совпадений. Попробуй найти друзей через меню "Поиск".' };
  }
  await sendMessage({ text: `Совпадений с тобой: ${matches.length}` }, id);
  const profiles = matches.reduce((acc, userId) => {
    acc.push(getUserProfile(userId));
    return acc;
  }, []);
  const users = await Promise.all(profiles);
  const text = users.reduce((acc, user) => {
    acc += `${user.firstName} из отдела ${user.department} (${user.link}) \n`;
    return acc;
  }, '');

  return { text };
}
