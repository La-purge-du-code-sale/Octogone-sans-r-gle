import Discord from 'discord.js';

const sendEmbedMessage = (channel, msg) => {
  const embed = new Discord.RichEmbed().setColor('#ffffff').setDescription(msg);
  channel.send(embed);
};

export default sendEmbedMessage;
