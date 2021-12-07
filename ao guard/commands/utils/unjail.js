/* eslint-disable max-statements-per-line */
/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'unjail',
			memberName: 'unjail',
			group: 'utils',
			description: 'Bir Kullanıcıyı Jaile Atar.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Mutelanacak kullanıcının idsini gir',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, { id }) {
		const { client } = this;
		if (message.member.hasPermission('BAN_MEMBERS')) {
			const guild = this.client.guilds.cache.get('853678199405674517');
			const memberTarger = guild.members.cache.get(id);
			if (!memberTarger) {
				message.channel.send('Lütfen geçerli bir id giriniz!').then((msg) => {
					client.setTimeout(() => {
						msg.delete();
						message.delete();
					}, Number(2000));
				});
			}
			else if (memberTarger.roles.cache.has('877602439719698432')) {
				memberTarger.roles.add('875715245014929459');
				message.channel.send(`${memberTarger.user.username} jailden çıkartıldı!`).then((msg) => {
					client.setTimeout(() => {
						msg.delete();
						message.delete();
					}, Number(2000));
				});
			}
			else {
				message.channel.send(`${memberTarger.user.username} jailde değil!`).then((msg) => {
					client.setTimeout(() => {
						msg.delete();
						message.delete();
					}, Number(2000));
				});
			}
		}
	}
};
