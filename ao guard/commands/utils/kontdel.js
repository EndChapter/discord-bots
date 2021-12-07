/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
/* eslint-disable class-methods-use-this */

'use strict';

const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'kontdel',
			memberName: 'kontdel',
			group: 'utils',
			description: 'Yeni gelen kullanıcıyı kayıt eder.',
			guildOnly: true,
			args: [
				{
					key: 'newUser',
					prompt: 'Kayıt etmek istediğin kullanıcıyı etiketlemezsen hangi kullanıcıyı kayıt etmek istediğini bilemem, kullanıcıyı sonraki mesajda etiketleyebilirsin veya komutu iptal edebilirsin...',
					type: 'string',
				},
			],
		});
	}

	run(message, { newUser }) {
		// if(message.channel.id == '844374778479640577'){
		if (message.member.user.id == '507232669164109824') {
			const user = message.guild.members.cache.find((member) => member.id === newUser);
			user.roles.remove('853678730961485845');
		}
	}
};
