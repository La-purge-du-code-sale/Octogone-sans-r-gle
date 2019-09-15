import getUser from './getUser.js';
import sendEmbedMessage from './sendEmbedMessage.js';

/**
 * @param  {Message} msg
 * @param  {Array} args
 * @param  {Number} number
 * @param  {String} msgToSend
 */
const changeScore = (msg, args, number, msgToSend) => {
  const user = getUser(msg, args);
  if (user) {
    const nickname = user.nickname
      .split(' ')
      .splice(1)
      .join(' ');
    const userScore = number
      ? parseInt(user.nickname.match(/\[(\d+)\]/)[1], 10) + number
      : 0;

    user
      .setNickname(`[${userScore}] ${nickname}`)
      .catch((err) => sendEmbedMessage(msg.channel, err));
    sendEmbedMessage(
      msg.channel,
      `${msgToSend} de ${args[1]} !
      ${nickname} a maintenant un score de ${userScore}`
    );
  } else {
    const wrongUser = args.splice(1).join(' ');
    sendEmbedMessage(
      msg.channel,
      `"${wrongUser}" n'est pas un gagnant valide!`
    );
  }
};

export default changeScore;
