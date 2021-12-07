/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'delete',
			memberName: 'delete',
			aliases: ['del', 'sil', 'mesajsil'],
			group: 'utils',
			description: 'Mesaj kanalından belirtilen sayıda mesaj siler.',
			guildOnly: true,
			args: [
				{
					key: 'number',
					prompt: 'Kaç mesaj silmemi istediğini belirtmezsen kaç mesaj silmek istediğini bilemem, bir sonraki mesajında kaç mesaj silmemi istediğini yazarsan sana yardımcı olabilirim...',
					type: 'integer',

					validate: (number) => {
						if (number < 100) { return true; }
						return false;
					},
				},
			],

		});
	}

	async run(message, { number }) {
		if (message.author.id == '842423528510586881' || message.author.id == '507232669164109824' || message.author.id == '853675153333157910' || message.member.roles.cache.has('854340781443776542')) {
			message.channel.bulkDelete(number + 1).catch(console.error);
			message.channel.send(`${number} tane mesaj silindi`)
				// eslint-disable-next-line func-names, prefer-arrow-callback
				.then((msg) => { setTimeout(function() { msg.delete(); }, Number(2000)); });
		}
		else {
			// eslint-disable-next-line prefer-arrow-callback, func-names, max-statements-per-line
			message.channel.send('bunu yapmaya yetkin yok').then((msg) => { setTimeout(function() { msg.delete(); }, Number(2000)); });
		}
	}
};
