import axios from 'axios';

const exampleActivity = {
  userFrom: '1234',
};

export function getNextActivityByType (event, type) {
  return new Promise((resolve => {
    resolve({
      eventName: 'Игра в настолки',
      eventDate: 'Каждую пятницу',
      user: {
        name: 'Тестер Тестерович',
        first_name: 'Тестер',
        last_name: 'Тестерович',
        picture: 'https://randomuser.me/api/portraits/men/79.jpg',
      }
    });
  }));
}
