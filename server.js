const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const app = express();
const port = 3032; // Используйте любой свободный порт

// VAPID ключи
const VAPID_PUBLIC_KEY = 'BJjhfWvGIDo2YdfWRHq0CA7Hs2d4uwvnHPHTDen6qSgX7lCu2oQqj2cDZ8aCxlwKii6D3XVpEyzw6aw4jlSqKFs'; // Замените на ваш ключ
const VAPID_PRIVATE_KEY = ' Geg32RNhRKPQv1uOwKHgUEHAdRWxacgen7WKiRjxk2M';  // Замените на ваш ключ

webpush.setVapidDetails(
  'mailto:aidariya.seilkhan@gmail.com', // Укажите ваш email
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

app.use(bodyParser.json());

// Хранилище подписок (замените на базу данных, если нужно)
let subscriptions = [];

// Обработка подписки
app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;

  // Сохраняем подписку
  subscriptions.push(subscription);

  console.log('Новая подписка:', subscription);
  res.status(201).json({ message: 'Subscription received.' });
});

// Отправка уведомления
app.post('/api/notify', (req, res) => {
  const { title, body, icon, badge, url } = req.body;

  const payload = JSON.stringify({ title, body, icon, badge, url });

  // Отправка уведомлений всем подписчикам
  subscriptions.forEach((subscription) => {
    webpush
      .sendNotification(subscription, payload)
      .then(() => console.log('Уведомление отправлено!'))
      .catch((error) => console.error('Ошибка отправки:', error));
  });

  res.status(200).json({ message: 'Notifications sent.' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
