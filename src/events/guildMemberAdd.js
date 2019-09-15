import changeCountMessage from '../functions/changeCountMessage.js';

/**
 * @param  {GuildMember} guildMember
 */
const guildMemberAdd = (guildMember) => {
  const { guild } = guildMember;
  guildMember.addRole(guild.roles.find((role) => role.name === 'Victimes'));
  guildMember.setNickname(`[0] ${guildMember.user.username}`);
  changeCountMessage(guildMember);
};

export default guildMemberAdd;
