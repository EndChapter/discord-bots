/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			memberName: 'ban',
			group: 'utils',
			description: 'Bir Kullanıcıyı Banlar.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Banlanacak kullanıcının idsini gir',
					type: 'string',
					default: '',
				},
				{
					key: 'content',
					prompt: 'Banlanma sebebi?',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, { id, content, bot }) {
		if (bot || message.member.hasPermission('BAN_MEMBERS')) {
			if (content == '') {
				// eslint-disable-next-line no-param-reassign
				message.channel.send('**Lütfen sebep girip tekrar deneyiniz. ^-^**');
				return;
			}
			const guild = this.client.guilds.cache.get('690898633893085244');
			let memberTarger = guild.members.cache.get(id);
			if (!memberTarger) {
				let userid = id.split('').slice(3, 21).join('');

				memberTarger = guild.members.cache.get(userid);
				if (!memberTarger) {
					userid = id.split('').slice(2, 20).join('');
					memberTarger = guild.members.cache.get(userid);
					if (!memberTarger) {
						message.channel.send('Lütfen geçerli bir id gir ve tekrar dene!');
						return;
					}
				}
			}
			const username = memberTarger.user.username;
			// eslint-disable-next-line max-statements-per-line, func-names, prefer-arrow-callback
			await message.channel.send(`${username} banlandı!`).then((msg) => setTimeout(function() { message.delete(); msg.delete(); }), Number(15000));
			memberTarger.ban();
		}
	}
};
