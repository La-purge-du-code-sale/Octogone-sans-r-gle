import Discord from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

export const token = process.env.TOKEN;
export const prefix = '!';
export const client = new Discord.Client();
