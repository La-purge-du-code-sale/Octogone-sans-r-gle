/**
 * @param  {Message} msg
 */
const init = (msg) => {
  msg.channel.send([...msg.guild.members]);
  msg.channel.send(msg.channel.permissionsFor(msg.author).toArray());
};

export default init;
