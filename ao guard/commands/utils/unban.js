/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'unban',
			memberName: 'unban',
			group: 'utils',
			description: 'Bir Kullanıcının Banını Kaldırır.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Unbanlanacak kullanıcının idsini gir',
					type: 'string',
					default: ''
				},
			],

		});
	}

	run(message, { id }) {
		// const request = message.member.roles.cache.has('836557251912531968');
		if (message.member.hasPermission('BAN_MEMBERS')) {
			message.guild.fetchBans().then((bans) => {
				const channel = message.guild.channels.cache.get('853692735471353886');
				if (bans.size == 0) return;
				const bUser = bans.find((b) => b.user.id == id);
				if (!bUser) return;
				message.guild.members.unban(bUser.user);
				// eslint-disable-next-line max-statements-per-line, prefer-arrow-callback, func-names
				message.channel.send(`${id}'nin banı kaldırıldı`).then((msg) => setTimeout(function() { message.delete(); msg.delete(); }, Number(3000)));
				const embed = new MessageEmbed()
					.setColor('#7A0194')
					.setTitle('❗ >> Yeni Bildiri')
				// .setImage('https://i.pinimg.com/originals/bf/2a/85/bf2a85f922ef8589dd4ccc180edb3e30.gif')*-
					.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
					.setDescription(`${id} idsine sahip kullanıcının banı kaldırıldı...`)
					.setTimestamp();
				channel.send(embed);
				message.channel.send(`${id}'nin banı kaldırıldı`).then((msg) => setTimeout(function() { message.delete(); msg.delete(); }, Number(3000)));
			});
		}
	}
};
