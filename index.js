const Discord = require('discord.js');
const client = new Discord.Client();

function setActivity(nbr) {
	switch(nbr % 5){
		case 0: client.user.setActivity("la mère de tom", { type: "WATCHING" }); break;
		case 2: client.user.setActivity("baiser la mère de tom", { type: "PLAYING" }); break;
		case 3: client.user.setActivity("du porno avec la mère de tom", { type: "STREAMING" }); break;
		case 4: client.user.setActivity("tom pleurer", { type: "LISTENING" });
	}
}

client.on('ready', () => {
	let nbr = 0;
	setInterval(() => {
		setActivity(++nbr);
	}, 15000);
	console.log(`Logged in as ${client.user.tag}!`);
})

function changeCountMessage(guildMember) {
	const guild = guildMember.guild;
	guild.channels.get('622502380541444116').setName(`${guild.members.array().length} personnes`);
}

client.on('guildMemberAdd', (guildMember) => {
	guildMember.addRole(guild.roles.find(role => role.name === 'Victimes'));
	guildMember.setNickname(`[0] ${guildMember.user.username}`);
	changeCountMessage(guildMember)
});

// TODO Refactor it, it has some duplicated code
client.on("guildMemberRemove", (guildMember) => {
	changeCountMessage(guildMember)
});

client.on('messageReactionAdd', (reaction, user) => {
	if (!user || user.bot || !reaction.message.channel.guild) return;
	if (reaction.message.channel.id !== '622498999529766942') return;
	const roleVictime = reaction.message.guild.roles.find(role => role.name === "Victimes");
	const roleRacailles = reaction.message.guild.roles.find(role => role.name === "Racailles du bac à sable");
	try {
		reaction.message.guild.member(user).removeRole(roleVictime)
		reaction.message.guild.member(user).addRole(roleRacailles)	
	} catch {
		console.error
	}
});

client.on('messageReactionRemove', (reaction, user) => {
	if (!user || user.bot || !reaction.message.channel.guild) return;
	if (reaction.message.channel.id !== '622498999529766942') return;
	const roleVictime = reaction.message.guild.roles.find(role => role.name === "Victimes");
	const roleRacailles = reaction.message.guild.roles.find(role => role.name === "Racailles du bac à sable");
	try {
		reaction.message.guild.member(user).addRole(roleVictime)
		reaction.message.guild.member(user).removeRole(roleRacailles)	
	} catch {
		console.error
	}
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
	
	if (args[0].split('!').length == 2)
		user = message.guild.members.get(args[0].split('!')[1].split('>')[0]);
	else if (args[0].split('@').length == 2)
		user = message.guild.members.get(args[0].split('@')[1].split('>')[0]);

	if (user) {
		let nickname = user.nickname.split(' ')[1];
		if (user.nickname.split(' ').length > 2) {
			let i = 2;
			while (i < user.nickname.split(' ').length) {
				nickname += ' ' + user.nickname.split(' ')[i];
				i++;
			}
		}
		let nbr1 = 0;
		if (nbr) nbr1 = parseInt(user.nickname.split('[')[1].split(']')[0]) + nbr;
			
		user.setNickname(`[${nbr1}] ${nickname}`)
			.catch(err => sendMessage(message.channel, err));
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

client.on('message', (message) => {
	const [command, ...args] = message.content.split(" ");
	if(!message.channel.permissionsFor(message.author).has('MANAGE_ROLES')) return sendMessage(message.channel, `Tu n\'as pas la permission de faire cette commande!`)

	if (command == "!victoire") {
			changeScore(args, message, 5, 'Victoire');
	} else if (command == "!victimised") {
			changeScore(args, message, -3, 'Victimisation');
	} else if (command == "!bisounours") {
			changeScore(args, message, 20, 'Bisounours');
	} else if (command == "!pute") {
			changeScore(args, message, 0, 'Cette pute');
	} else if (command == '!init') {
		message.channel.send([...message.guild.members]);
		message.channel.send(message.channel.permissionsFor(message.author).toArray());
	}
});
