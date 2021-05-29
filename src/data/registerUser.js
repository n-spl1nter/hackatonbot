import { register } from '../utils/innerAPi';

export default async function registerUser(event) {
  await register(event);

  return {
    text: 'Добро пожаловать в OmniFriend! Здесь ты сможешь найти единомышленников, с которыми хорошо проведешь время.',
  };
}
