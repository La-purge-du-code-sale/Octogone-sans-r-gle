const changeCountMessage = (guildMember) => {
  const guild = guildMember.guild;
  guild.channels
    .get('622502380541444116')
    .setName(`${[...guild.members].length} personnes`);
};

export default changeCountMessage;
