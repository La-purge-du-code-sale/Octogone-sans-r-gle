const Discord = require('discord.js');
const client = new Discord.Client();

function setActivity(nbr) {
	if (nbr % 5 == 0)
		client.user.setActivity("la mère de tom", { type: "WATCHING" });
	else if (nbr % 5 == 2)
		client.user.setActivity("baiser la mère de tom", { type: "PLAYING" });
	else if (nbr % 5 == 3)
		client.user.setActivity("du porno avec la mère de tom", { type: "STREAMING" });
	else if (nbr % 5 == 4)
		client.user.setActivity("tom pleurer", { type: "LISTENING" });
}
client.on('ready', () => {
	let nbr = 0;
	setInterval(() => {
		nbr++;
		setActivity(nbr);
	}, 15000);
	console.log(`Logged in as ${client.user.tag}!`);
})

client.on('guildMemberAdd', (guildMember) => {
	guildMember.addRole(guildMember.guild.roles.find(role => role.name === 'Victimes'));
	guildMember.setNickname(`[0] ${guildMember.user.username}`);
	guildMember.guild.channels.get('622502380541444116').setName(`${guildMember.guild.members.array().length} personnes`);
});



client.on("guildMemberRemove", (guildMember) => {
	guildMember.guild.channels.get('622502380541444116').setName(`${guildMember.guild.members.array().length} personnes`);
});

client.on('messageReactionAdd', (reaction, user) => {
	if (!user) return;
	if (user.bot) return;
	if (!reaction.message.channel.guild) return;
	if (reaction.message.channel.id !== '622498999529766942') return;
	let role = reaction.message.guild.roles.find(role => role.name === "Victimes");
	reaction.message.guild.member(user).removeRole(role).catch(console.error);
	role = reaction.message.guild.roles.find(role => role.name === "Racailles du bac à sable");
	reaction.message.guild.member(user).addRole(role).catch(console.error);
});

client.on('messageReactionRemove', (reaction, user) => {
	if (!user) return;
	if (user.bot) return;
	if (!reaction.message.channel.guild) return;
	if (reaction.message.channel.id !== '622498999529766942') return;
	let role = reaction.message.guild.roles.find(role => role.name === "Victimes");
	reaction.message.guild.member(user).addRole(role).catch(console.error);
	role = reaction.message.guild.roles.find(role => role.name === "Racailles du bac à sable");
	reaction.message.guild.member(user).removeRole(role).catch(console.error);
});

client.on('raw', packet => {
	if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
	const channel = client.channels.get(packet.d.channel_id);
	if (channel.messages.has(packet.d.message_id)) return;
	channel.fetchMessage(packet.d.message_id).then(message => {
		const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
		const reaction = message.reactions.get(emoji);
		if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
		if (packet.t === 'MESSAGE_REACTION_ADD') {
			client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
		}
		if (packet.t === 'MESSAGE_REACTION_REMOVE') {
			client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
		}
	});
});

function sendMessage(channel, msg) {
	const embed = new Discord.RichEmbed()
		.setColor('#ffffff')
		.setDescription(msg);
	channel.send(embed);
}

function changeScore(args, message, nbr, msg) {
	let user;
	if (args[1].split('!').length == 2)
		user = message.guild.members.get(args[1].split('!')[1].split('>')[0]);
	else if (args[1].split('@').length == 2)
		user = message.guild.members.get(args[1].split('@')[1].split('>')[0]);
	if (user) {
		let nickname = user.nickname.split(' ')[1];
		if (user.nickname.split(' ').length > 2) {
			let i = 2;
			while (i < user.nickname.split(' ').length) {
				nickname += ' ' + user.nickname.split(' ')[i];
				i++;
			}
		}
		let nbr1;
		if (nbr)
			nbr1 = parseInt(user.nickname.split('[')[1].split(']')[0]) + nbr;
		else
			nbr1 = 0;
		user.setNickname(`[${nbr1}] ${nickname}`)
			.catch(err => sendMessage(message.channel, `${err}`));
		sendMessage(message.channel, `${msg} de ${args[1]}!\n${nickname} a maintenant un score de ${nbr1}`);
	} else {
		let msg = args[1];
		let i = 2;
		while (i < args.length) {
			msg += ' ' + args[i];
			i++;
		}
		sendMessage(message.channel, `\"${msg}\" n'est pas un gagnant valide!`);
	}
}

client.on('message', async function (message) {
	const args = message.content.split(" ");
	if (args[0] == "!victoire") {
		if (message.channel.permissionsFor(message.author).has('MANAGE_ROLES'))
			changeScore(args, message, 5, 'Victoire');
		else
			sendMessage(message.channel, `Tu n\'as pas la permission de faire cette commande!`);
	} else if (args[0] == "!victimised") {
		if (message.channel.permissionsFor(message.author).has('MANAGE_ROLES'))
			changeScore(args, message, -3, 'Victimisation');
		else
			sendMessage(message.channel, `Tu n\'as pas la permission de faire cette commande!`);
	} else if (args[0] == "!bisounours") {
		if (message.channel.permissionsFor(message.author).has('MANAGE_ROLES'))
			changeScore(args, message, 20, 'Bisounours');
		else
			sendMessage(message.channel, `Tu n\'as pas la permission de faire cette commande!`);
	} else if (args[0] == "!pute") {
		if (message.channel.permissionsFor(message.author).has('MANAGE_ROLES'))
			changeScore(args, message, 0, 'Cette pute');
		else
			sendMessage(message.channel, `Tu n\'as pas la permission de faire cette commande!`);
	} else if (args[0] == '!init') {
		message.channel.send(message.guild.members.array());
		message.channel.send(message.channel.permissionsFor(message.author).toArray());
	}
});
