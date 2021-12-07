/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'deleteall',
			memberName: 'deleteall',
			aliases: ['delall', 'silhepsini'],
			group: 'utils',
			description: 'Kanaldaki tüm mesajları siler.',
			guildOnly: true,
		});
	}

	async run(message) {
		if (message.author.id == '842423528510586881' || message.author.id == '853675153333157910' || message.author.id == '507232669164109824' || message.member.roles.cache.has('854340781443776542')) {
			let fetched;
			do {
				// eslint-disable-next-line no-await-in-loop
				fetched = await message.channel.messages.fetch({ limit: 100 });
				message.channel.bulkDelete(fetched);
			}
			while (fetched.size >= 2);
		}
		else {
			// eslint-disable-next-line prefer-arrow-callback, func-names, max-statements-per-line
			message.channel.send('bunu yapmaya yetkin yok').then((msg) => { setTimeout(function() { msg.delete(); }, Number(2000)); });
		}
	}
};
