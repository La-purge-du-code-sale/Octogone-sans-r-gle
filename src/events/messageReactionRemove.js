import isMessageIrrelevant from '../functions/isMessageIrrelevant.js';

/**
 * @param  {MessageReaction} reaction
 * @param  {User} user
 */
const messageReactionRemove = (reaction, user) => {
  if (isMessageIrrelevant()) {
    return;
  }
  const roleVictime = reaction.message.guild.roles.find(
    (role) => role.name === 'Victimes'
  );
  const roleRacailles = reaction.message.guild.roles.find(
    (role) => role.name === 'Racailles du bac à sable'
  );
  try {
    reaction.message.guild.member(user).addRole(roleVictime);
    reaction.message.guild.member(user).removeRole(roleRacailles);
  } catch (error) {
    console.error(error);
  }
};

export default messageReactionRemove;
