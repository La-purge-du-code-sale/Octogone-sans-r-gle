import changeCountMessage from '../functions/changeCountMessage.js';

const guildMemberRemove = (guildMember) => {
  changeCountMessage(guildMember);
};

export default guildMemberRemove;
