import { prefix } from '../globals.js';
import commands from '../commands.js';
import sendEmbedMessage from '../functions/sendEmbedMessage.js';

const message = (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) {
    return;
  }
  const [command, ...args] = msg.content.slice(prefix.length).split(' ');
  if (!msg.channel.permissionsFor(msg.author).has('MANAGE_ROLES')) {
    return sendEmbedMessage(
      msg.channel,
      "Tu n'as pas la permission de faire cette commande!"
    );
  }
  if (commands.hasOwnProperty(command)) {
    commands[command](msg, args);
  }
};

export default message;
