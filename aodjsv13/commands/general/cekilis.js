/* eslint-disable strict */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');
const { prefix } = require('../../config.js');

module.exports = class CekilisCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cekilis',
			memberName: 'cekilis',
			group: 'general',
			description: 'Kullanıcının istediği bir isteği çalıştırır.',
			args: [
				{
					key: 'text',
					prompt: 'Hangi isteği göndermek istersin?',
					type: 'string',
				},
			],
		});
	}

	run(message, { text }) {
		if (message.channel.id === '853692411796652032' || message.channel.id === '861276217054199815') {
			const embed = new MessageEmbed()
				.setColor('#7274ff')
				.setAuthor(`${message.author.tag}`, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
				.setDescription(text)
				.setTimestamp();
			message.channel.send(`${prefix}istek <istek> troll istekler olursa ceza verilecektir.||<@&855940072762507325>||`, { embed }).then((m) => {
				m.react('✅');
				m.react('❎');
			}).catch((err) => console.error(err));
			message.delete({ timeout: 100 });
		}
	}
};
