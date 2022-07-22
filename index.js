const TeleBot = require('telebot');
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TELEGRAM_BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN is not defined');
  process.exit(1);
}

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