/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			aliases: ['resim'],
			group: 'general',
			memberName: 'avatar',
			description: 'Kullanıcının resmini görüntüler.',
			args: [
				{
					key: 'id',
					prompt: 'Kullanıcıyı giriniz.',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, args) {
		let id = '';
		try {
			id = await args.rest('string');
		}
		catch {
			id = '';
		}
		const guild = this.container.client.guilds.cache.get('853678199405674517');
		let memberTarger = guild.members.cache.get(id);
		if (!memberTarger) {
			let userid = id.split('').slice(3, 21).join('');

			memberTarger = guild.members.cache.get(userid);
			if (!memberTarger) {
				userid = id.split('').slice(2, 20).join('');
				memberTarger = guild.members.cache.get(userid);
				if (!memberTarger) {
					memberTarger = message.member;
				}
			}
		}
		const embed = new MessageEmbed()
			.setColor('#000000')
			.addField(`İsim: ${memberTarger.user.username}`, `ID: ${memberTarger.user.id}`)
			.setImage(memberTarger.user.displayAvatarURL({ size: 1024, dynamic: true }));
		message.channel.send({ embeds: [embed] });
	}
};
