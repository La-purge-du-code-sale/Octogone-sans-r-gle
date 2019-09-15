/**
 * @param  {Message} msg
 * @param  {Array} args
 */
const getUser = (msg, args) => {
  if (args[0].split('!').length === 2) {
    return msg.guild.members.get(args[0].split('!')[1].split('>')[0]);
  } else if (args[0].split('@').length === 2) {
    return msg.guild.members.get(args[0].split('@')[1].split('>')[0]);
  }
};

export default getUser;
