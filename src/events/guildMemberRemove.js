import changeCountMessage from '../functions/changeCountMessage.js';

/**
 * @param  {GuildMember} guildMember
 */
const guildMemberRemove = (guildMember) => {
  changeCountMessage(guildMember);
};

export default guildMemberRemove;
