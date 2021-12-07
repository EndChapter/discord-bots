/* eslint-disable strict */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');
const { prefix } = require('../../config.js');

module.exports = class AnketCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'anket',
			memberName: 'anket',
			aliases: ['ankte'],
			group: 'general',
			description: 'Kullanıcının istediği bir isteği çalıştırır.',
			args: [
				{
					key: 'text',
					prompt: 'Neyin Anketini Yapıyon?',
					type: 'string',
				},
			],
		});
	}

	async run(message, args) {
		let text = '';
		try {
			text = await args.rest('string');
		}
		catch {
			message.channel.send('Lütfen anket sebebini giriniz!');
			return;
		}
		if (message.channel.id === '881585368959430696' || message.channel.id === '881508111486189611') {
			const embed = new MessageEmbed()
				.setColor('#10F500')
				.setAuthor(`${message.author.tag} - ${message.member.user.id}`, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
				.setDescription(text)
				.setTimestamp();
			message.channel.send({ content: '||<@&855940072762507325>||', embeds: [embed] }).then((m) => {
				m.react('✅');
				m.react('❎');
			}).catch((err) => console.error(err));
			setTimeout(() => {
				message.delete();
			}, Number(100));
		}
	}
};
