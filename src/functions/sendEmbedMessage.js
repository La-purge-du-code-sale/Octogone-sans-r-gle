import Discord from 'discord.js';

/**
 * @param  {TextChannel} channel
 * @param  {String} msg
 */
const sendEmbedMessage = (channel, msg) => {
  const embed = new Discord.RichEmbed().setColor('#ffffff').setDescription(msg);
  channel.send(embed);
};

export default sendEmbedMessage;
