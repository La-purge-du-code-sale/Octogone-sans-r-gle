/**
 * @param  {MessageReaction} reaction
 * @param  {User} user
 */
const isMessageIrrelevant = (reaction, user) => {
  if (
    !user ||
    user.bot ||
    !reaction.message.channel.guild ||
    reaction.message.channel.id !== '622498999529766942'
  ) {
    return true;
  }
  return false;
};

export default isMessageIrrelevant;
