import { register } from '../utils/innerAPi';
import { sendMessage, getUserProfile } from '../utils/api';

export default async function registerUser(event) {
  const { sender: { id } } = event;
  await register(event);
  const user = await getUserProfile(id);
  const greetings = {
    text: `Привет, ${user.firstName}😊 Я бот OmniFriend 👐 помогу тебе найти единомышленика среди сотрудников всей компании.`,
  };
  await sendMessage(greetings, id);
  const about = {
    text: `Возле окна ввода сообщения есть пункт меню:
🔎 Поиск — умный алгорит поиска новых друзей и мероприятий
💚 Совпадения — твои единомышленники
⚙️ Настройки — можешь изменить настройки поиска`
  };
  await sendMessage(about, id);
}
