/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */

'use strict';

const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'slowmode',
			memberName: 'slowmode',
			group: 'utils',
			description: 'Bir Kullanıcıyı Banlar.',
			guildOnly: true,
			args: [
				{
					key: 'seconds',
					prompt: 'Banlanacak kullanıcının idsini gir',
					type: 'string',
				},
				{
					key: 'channelid',
					prompt: 'Banlanma sebebi?',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, { seconds, channelid, bot }) {
		if (bot || message.member.hasPermission('BAN_MEMBERS')) {
			const guild = this.client.guilds.cache.get('853678199405674517');
			let channel = guild.channels.cache.get(channelid);
			if (!channel) {
				let splittedChannelId = channelid.split('').slice(3, 21).join('');

				channel = guild.channels.cache.get(splittedChannelId);
				if (!channel) {
					splittedChannelId = channelid.split('').slice(2, 20).join('');
					channel = guild.channels.cache.get(splittedChannelId);
					if (!channel) {
						channel = message.channel;
					}
				}
			}
			// eslint-disable-next-line max-statements-per-line, func-names, prefer-arrow-callback
			await message.channel.send(`${channel.name} kanalına ${seconds} saniye slowmode getirildi!`).then((msg) => setTimeout(function() { message.delete(); msg.delete(); }), Number(2000));
			channel.setRateLimitPerUser(seconds);
		}
	}
};
