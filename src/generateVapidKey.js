const webpush = require('web-push');

// Генерация VAPID-ключей
const vapidKeys = webpush.generateVAPIDKeys();

// Вывод ключей в консоль
console.log('Публичный ключ (publicKey):', vapidKeys.publicKey);
console.log('Приватный ключ (privateKey):', vapidKeys.privateKey);
