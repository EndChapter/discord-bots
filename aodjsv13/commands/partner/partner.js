/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');
const { default: axios } = require('axios');

module.exports = class PartnerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'partner',
			memberName: 'partner',
			aliases: ['partner'],
			group: 'partner',
			description: 'Sunucuda günlük yapılan partnerlik sayısını görüntüler.',
		});
	}

	run(message) {
		const { client } = this.container;
		const list = [];
		let sayi = 0;
		function embed() {
			return new MessageEmbed()
				.setTitle('İşte günlük partnerlik yapanların listesi\n')
				.setColor('#0BD4A2')
				.setDescription(
					(list[sayi] ? `${list[sayi].sira}. ${list[sayi].username}\n 					Günlük partnerlik sayısı: \`${list[sayi].sayi}\` \n` : 'tanımlanmadı')
					+ (list[sayi + 1] ? `${list[sayi + 1].sira}. ${list[sayi + 1].username}\n		Günlük partnerlik sayısı: \`${list[sayi + 1].sayi}\` \n` : '')
					+ (list[sayi + 2] ? `${list[sayi + 2].sira}. ${list[sayi + 2].username}\n		Günlük partnerlik sayısı: \`${list[sayi + 2].sayi}\` \n` : '')
					+ (list[sayi + 3] ? `${list[sayi + 3].sira}. ${list[sayi + 3].username}\n		Günlük partnerlik sayısı: \`${list[sayi + 3].sayi}\` \n` : '')
					+ (list[sayi + 4] ? `${list[sayi + 4].sira}. ${list[sayi + 4].username}\n		Günlük partnerlik sayısı: \`${list[sayi + 4].sayi}\` \n` : '')
					+ (list[sayi + 5] ? `${list[sayi + 5].sira}. ${list[sayi + 5].username}\n		Günlük partnerlik sayısı: \`${list[sayi + 5].sayi}\` \n` : '')
					+ (list[sayi + 6] ? `${list[sayi + 6].sira}. ${list[sayi + 6].username}\n		Günlük partnerlik sayısı: \`${list[sayi + 6].sayi}\` \n` : '')
					+ (list[sayi + 7] ? `${list[sayi + 7].sira}. ${list[sayi + 7].username}\n		Günlük partnerlik sayısı: \`${list[sayi + 7].sayi}\` \n` : '')
					+ (list[sayi + 8] ? `${list[sayi + 8].sira}. ${list[sayi + 8].username}\n		Günlük partnerlik sayısı: \`${list[sayi + 8].sayi}\` \n` : ''),
				);
		}
		axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/partnersorumlulari.json').then((response) => {
			let s = 1;
			// eslint-disable-next-line guard-for-in, no-restricted-syntax
			for (const users in response.data) {
				list.push({
					username: `<@${users}>`,
					sayi: response.data[users].gunlukpartner ? response.data[users].gunlukpartner : 0,
					sira: s,
				});
				s += 1;
			}
			message.channel.send({embeds: [embed()]}).then((msg) => {
				msg.react('860213325031014500');
				msg.react('860213325072957511');
				setTimeout(() => {
					// eslint-disable-next-line no-unused-vars
					const filterforward = (reaction, user) => reaction.emoji.name === 'forward';

					const collectorforward = msg.createReactionCollector(filterforward, { time: 900000000 });


					// eslint-disable-next-line no-unused-vars
					collectorforward.on('collect', async (r) => {
						if (r.emoji.id == '860213325072957511') {
							if (sayi + 9 < list.length) {
								sayi += 9;
							}
							if (message.member.id == client.id) {
								return;
							}
							await msg.edit({ embeds: [embed()] });
						}
					});
				}, Number(1500));
				setTimeout(() => {
					// eslint-disable-next-line no-unused-vars
					const filterprevious = (reaction, user) => reaction.emoji.name === 'backward';

					const collectorprevious = msg.createReactionCollector(filterprevious, { time: 900000000 });


					// eslint-disable-next-line no-unused-vars
					collectorprevious.on('collect', async (r) => {
						if (r.emoji.id == '860213325031014500') {
							if (message.member.id == client.id) {
								return;
							}
							sayi -= 9;
							if (sayi < 0) {
								sayi = 0;
							}
							await msg.edit({ embeds: [embed()] });
						}
					});
				}, Number(1500));
			});
		});
	}
};
