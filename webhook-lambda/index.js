const axios = require('axios');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

/**
 * Send voice to Telegram
 *
 * @param {int} chatId Chat ID
 * @param {string} voiceUrl URL of the audio to send
 *
 * @return {object} Request Promise
 */
async function sendVoiceToTelegram(chatId, voiceUrl) {
  return await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVoice`, {
    chat_id: chatId,
    voice: voiceUrl,
  }, {
    headers: {
      ContentType: 'application/json'
    }
  });
}



/**
 * Main Lambda function
 *
 * @param {object} event AWS Lambda uses this parameter to pass in event data to the handler.
 * @param {object} context AWS Lambda uses this parameter to provide your handler the runtime information of the Lambda function that is executing.
 *
 * @return {object} Request Promise
 */
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const message = body && body.message && body.message.text;
    const tauntNumber = parseInt(message);
    const chatId = body && body.message && body.message.chat && body.message.chat.id;

    if (!chatId)
      throw new Error(`Chat ID not valid`);

    if (typeof tauntNumber !== 'number' || (tauntNumber < 1 && tauntNumber > 43))
      throw new Error(`Taunt number not valid`);

    await sendVoiceToTelegram(chatId, `https://age-of-empires-taunts.s3-eu-west-1.amazonaws.com/${tauntNumber}.ogg`)
    context.succeed();
  } catch (e) {
    context.fail(e);
  }
};
