const TelegramBot = require('node-telegram-bot-api');

// Bot tokenini shu yerga kiriting
const token = '7961603728:AAGYDRnOhUkniuwiPVVlx2t5XSF_sBD2uDA';
const bot = new TelegramBot(token, { polling: true });

let userData = {};

// Start komandasi va tugmalar
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      keyboard: [
        ['Kursga yozilish']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };
  bot.sendMessage(chatId, 'Salom! Kursga yozilish uchun "Kursga yozilish" tugmasini bosing:', options);
});

// Kursga yozilish tugmasi
bot.onText(/Kursga yozilish/, (msg) => {
  const chatId = msg.chat.id;
  userData[chatId] = {}; // Yangi foydalanuvchi uchun ma'lumotlar obyektini yaratish

  // Birinchi savol: Ism va familiya
  bot.sendMessage(chatId, 'Ismingizni va familiyangizni kiriting:', {
    reply_markup: { force_reply: true }
  });
});

// Foydalanuvchidan ma'lumotlarni olish
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (userData[chatId]) {
    const user = userData[chatId];

    // Ism va familiya
    if (!user.name) {
      user.name = msg.text;
      bot.sendMessage(chatId, 'Yoshingizni kiriting:', {
        reply_markup: { force_reply: true }
      });
    }
    // Yosh
    else if (!user.age) {
      user.age = msg.text;
      bot.sendMessage(chatId, 'Telefon raqamingizni kiriting:', {
        reply_markup: { force_reply: true }
      });
    }
    // Telefon raqami
    else if (!user.phone) {
      user.phone = msg.text;
      bot.sendMessage(chatId, 'Manzilingizni kiriting:', {
        reply_markup: { force_reply: true }
      });
    }
    // Manzil
    else if (!user.address) {
      user.address = msg.text;
      const adminChatId = '-1002351154111'; // Admin guruhining chat ID

      // Admin guruhiga ma'lumot yuborish
      bot.sendMessage(adminChatId, `Yangi yozilish: \nIsm: ${user.name}\nYosh: ${user.age}\nTelefon: ${user.phone}\nManzil: ${user.address}`);

      // Foydalanuvchiga tasdiq xabari
      bot.sendMessage(chatId, 'Tez orada adminimiz siz bilan aloqaga chiqadi.');

      // Foydalanuvchi ma'lumotlarini tozalash
      delete userData[chatId];
    }
  }
});
