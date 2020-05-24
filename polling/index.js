const TeleBot = require('telebot');
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

const bot = new TeleBot({
  token: TELEGRAM_BOT_TOKEN,
});

bot.on('text', msg => {
  const number = parseInt(msg.text);
  if (typeof number === 'number' && number > 0 && number < 43)
    return bot.sendVoice(
      msg.chat.id,
      `https://age-of-empires-taunts.s3-eu-west-1.amazonaws.com/${number}.ogg`,
      {
        serverDownload: true,
        replyToMessage: true,
        fileName: number.toString()
      })
});


bot.start();