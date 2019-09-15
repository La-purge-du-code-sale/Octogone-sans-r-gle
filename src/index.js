import guildMemberAdd from './events/guildMemberAdd.js';
import guildMemberRemove from './events/guildMemberRemove.js';
import messageReactionAdd from './events/messageReactionAdd.js';
import messageReactionRemove from './events/messageReactionRemove.js';
import raw from './events/raw.js';
import ready from './events/ready.js';
import { client, token } from './globals.js';
import message from './events/message.js';

client.on('ready', ready);
client.on('guildMemberAdd', guildMemberAdd);
client.on('guildMemberRemove', guildMemberRemove);
client.on('messageReactionAdd', messageReactionAdd);
client.on('messageReactionRemove', messageReactionRemove);
client.on('raw', raw);
client.on('message', message);

client.login(token);
