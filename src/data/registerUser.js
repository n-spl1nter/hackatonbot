import { register } from '../utils/innerAPi';
import { sendMessage } from '../utils/api';

export default async function registerUser(event) {
  const { sender: { id } } = event;
  await register(event);
  const message = {
    text: 'Привет 😊 . Я бот OmniFriend 👐 помогу тебе найти единомышленика среди сотрудников всей компании.',
  };
  await sendMessage(message, id);
}
