/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'yasakkelimeliste',
			memberName: 'yasakkelimeliste',
			aliases: ['yasakelimeliste', 'yasaklikelimeliste', 'yasaklıkelimeliste', 'yasakelimelistesi', 'yasaklikelimelistesi', 'yasaklıkelimelistesi'],
			group: 'utils',
			description: 'Mesaj kanalından yasaklı kelimeleri listeler',
			guildOnly: true,
		});
	}

	run(message) {
		const { id } = this.client;
		const { client } = this;
		let sayi = 0;
		function embed() {
			return new MessageEmbed()
				.setTitle('İşte yasaklı kelimeler listesi:\n')
				.setColor('#7A0194')
				.setDescription(
					(global.bannedWords[sayi] ? `${sayi + 1}: ${global.bannedWords[sayi]}\n` : '')
					+ (global.bannedWords[sayi + 1] ? `${sayi + 2}: ${global.bannedWords[sayi + 1]}\n` : '')
					+ (global.bannedWords[sayi + 2] ? `${sayi + 3}: ${global.bannedWords[sayi + 2]}\n` : '')
					+ (global.bannedWords[sayi + 3] ? `${sayi + 4}: ${global.bannedWords[sayi + 3]}\n` : '')
					+ (global.bannedWords[sayi + 4] ? `${sayi + 5}: ${global.bannedWords[sayi + 4]}\n` : '')
					+ (global.bannedWords[sayi + 5] ? `${sayi + 6}: ${global.bannedWords[sayi + 5]}\n` : '')
					+ (global.bannedWords[sayi + 6] ? `${sayi + 7}: ${global.bannedWords[sayi + 6]}\n` : '')
					+ (global.bannedWords[sayi + 7] ? `${sayi + 8}: ${global.bannedWords[sayi + 7]}\n` : '')
					+ (global.bannedWords[sayi + 8] ? `${sayi + 9}: ${global.bannedWords[sayi + 8]}\n` : '')
					+ (global.bannedWords[sayi + 9] ? `${sayi + 10}: ${global.bannedWords[sayi + 9]}\n` : '')
					+ (global.bannedWords[sayi + 10] ? `${sayi + 11}: ${global.bannedWords[sayi + 10]}\n` : '')
					+ (global.bannedWords[sayi + 11] ? `${sayi + 12}: ${global.bannedWords[sayi + 11]}\n` : '')
					+ (global.bannedWords[sayi + 12] ? `${sayi + 13}: ${global.bannedWords[sayi + 12]}\n` : '')
					+ (global.bannedWords[sayi + 13] ? `${sayi + 14}: ${global.bannedWords[sayi + 13]}\n` : '')
					+ (global.bannedWords[sayi + 14] ? `${sayi + 15}: ${global.bannedWords[sayi + 14]}\n` : ''),
				);
		}

		message.channel.send(embed()).then((msg) => {
			msg.react('⬅️');
			msg.react('➡️');
			client.setTimeout(() => {
				// eslint-disable-next-line no-unused-vars
				const filterforward = (reaction, user) => reaction.emoji.name === '➡️';

				const collectorforward = msg.createReactionCollector(filterforward, { time: 900000000 });


				collectorforward.on('collect', async (reaction, user) => {
					if (sayi + 15 < global.bannedWords.length) {
						sayi += 15;
					}
					if (user.id == id) {
						return;
					}
					await msg.edit(embed());
				});
			}, Number(1500));
			client.setTimeout(() => {
				// eslint-disable-next-line no-unused-vars
				const filterprevious = (reaction, user) => reaction.emoji.name === '⬅️';

				const collectorprevious = msg.createReactionCollector(filterprevious, { time: 900000000 });


				collectorprevious.on('collect', async (reaction, user) => {
					if (user.id == id) {
						return;
					}
					sayi -= 15;
					if (sayi < 0) {
						sayi = 0;
					}
					msg.edit(embed());
				});
			}, Number(1500));
		});
	}
};
