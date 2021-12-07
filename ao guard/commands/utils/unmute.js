/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'unmute',
			memberName: 'unmute',
			group: 'utils',
			description: 'Bir Kullanıcının Susturulmasını Kaldırır.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Mute\'u kaldırılacak kullanıcının idsini gir',
					type: 'string',
					default: '',
				},
			],


			userPermissions: ['KICK_MEMBERS'],
		});
	}

	run(message, { id }) {
		if (message.member.hasPermission('KICK_MEMBERS')) {
			let userid = id.split('').slice(3, 21).join('');

			let memberTarger = message.guild.members.cache.get(userid);
			if (!memberTarger) {
				userid = id.split('').slice(2, 20).join('');
				memberTarger = message.guild.members.cache.get(userid);
				if (!memberTarger) {
					message.channel.send('Lütfen geçerli bir id gir ve tekrar dene!');
					return;
				}
			}
			const username = memberTarger.user.tag;
			if (memberTarger.roles.cache.has('855861447946797118')) {
				// eslint-disable-next-line prefer-arrow-callback, max-statements-per-line, func-names
				message.channel.send(`${username} kullanıcısının susturulması kaldırıldı!`).then((msg) => setTimeout(function() { message.delete(); msg.delete(); }), Number(3000));
				memberTarger.roles.remove('855861447946797118');
				// const request = message.member.roles.cache.has('836557251912531968');
			}
			else {
				// eslint-disable-next-line prefer-arrow-callback, max-statements-per-line, func-names
				message.channel.send('Bu kullanıcı mute\'lu değil').then((msg) => setTimeout(function() { message.delete(); msg.delete(); }), Number(3000));
			}
		}
	}
};
