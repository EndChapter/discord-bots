/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');
const { default: axios } = require('axios');


module.exports = class WeeklyRankCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'weeklyrank',
			memberName: 'weeklyrank',
			aliases: ['weeklyleader'],
			group: 'general',
			description: 'Tüm Sunucunun Haftalık Level Durumunu Görüntüler.',
		});
	}

	async run(message) {
		const { client } = this.container;
		const { levelUpNumber } = global;
		const list = {};
		const listTwo = {};
		const listThree = [];
		let sayi = 0;
		function embed() {
			return new MessageEmbed()
				.setTitle('Haftalık Lider Tablosu:\n')
				.setColor('#EB9B06')
				.setDescription(
					(listThree[sayi] ? `${listThree[sayi].sira}. ${listThree[sayi].username}\n Mesaj Sayısı: ${listThree[sayi].sayi} \n` : 'tanımlanmadı')
					+ (listThree[sayi + 1] ? `${listThree[sayi + 1].sira}. ${listThree[sayi + 1].username}\n Mesaj Sayısı: ${listThree[sayi + 1].sayi} \n` : '')
					+ (listThree[sayi + 2] ? `${listThree[sayi + 2].sira}. ${listThree[sayi + 2].username}\n Mesaj Sayısı: ${listThree[sayi + 2].sayi} \n` : '')
					+ (listThree[sayi + 3] ? `${listThree[sayi + 3].sira}. ${listThree[sayi + 3].username}\n Mesaj Sayısı: ${listThree[sayi + 3].sayi} \n` : '')
					+ (listThree[sayi + 4] ? `${listThree[sayi + 4].sira}. ${listThree[sayi + 4].username}\n Mesaj Sayısı: ${listThree[sayi + 4].sayi} \n` : '')
					+ (listThree[sayi + 5] ? `${listThree[sayi + 5].sira}. ${listThree[sayi + 5].username}\n Mesaj Sayısı: ${listThree[sayi + 5].sayi} \n` : '')
					+ (listThree[sayi + 6] ? `${listThree[sayi + 6].sira}. ${listThree[sayi + 6].username}\n Mesaj Sayısı: ${listThree[sayi + 6].sayi} \n` : '')
					+ (listThree[sayi + 7] ? `${listThree[sayi + 7].sira}. ${listThree[sayi + 7].username}\n Mesaj Sayısı: ${listThree[sayi + 7].sayi} \n` : '')
					+ (listThree[sayi + 8] ? `${listThree[sayi + 8].sira}. ${listThree[sayi + 8].username}\n Mesaj Sayısı: ${listThree[sayi + 8].sayi} \n` : ''),
				);
		}
		axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/weekrank/mesajsayisi.json').then(async (response) => {
			function dynamicSort(property) {
				let sortOrder = 1;
				if (property[0] === '-') {
					sortOrder = -1;
					property = property.substr(1);
				}
				return function(a, b) {
					/*
					 * next line works with strings and numbers,
					 * and you may want to customize it to your needs
					 */
					const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
					return result * sortOrder;
				};
			}
			if (response.data != null) {
				// eslint-disable-next-line guard-for-in, no-restricted-syntax
				for (const key in response.data) {
					list[key] = {
						id: key,
						mesajsayisi: () => {
							let sy = 1;
							for (let i = 0; i < response.data[key].level; i += 1) {
								sy += levelUpNumber + (levelUpNumber * i) + (i * levelUpNumber * 0.5);
							}
							sy += response.data[key].sayi;
							return sy;
						},
					};
				}
			}
			axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/mesajsayisi.json').then(async (rsp) => {
				// eslint-disable-next-line guard-for-in, no-restricted-syntax
				for (const key in rsp.data) {
					listTwo[key] = {
						id: key,
						mesajsayisi: () => {
							let sy = 1;
							for (let i = 0; i < rsp.data[key].level; i += 1) {
								sy += levelUpNumber + (levelUpNumber * i) + (i * levelUpNumber * 0.5);
							}
							sy += rsp.data[key].sayi;
							return sy;
						},
					};
				}
				// eslint-disable-next-line guard-for-in, no-restricted-syntax
				for (const key in listTwo) {
					try {
						listThree.push({
							username: `<@${key}>`,
							sayi: (listTwo[key].mesajsayisi() - list[key].mesajsayisi()),
						});
					}
					catch {
						listThree.push({
							username: `<@${key}>`,
							sayi: listTwo[key].mesajsayisi(),
						});
					}
				}
				listThree.sort(dynamicSort('-sayi'));
				for (let i = 0; i < listThree.length; i += 1) {
					listThree[i].sira = i + 1;
				}
				message.channel.send({ embeds: [embed()] }).then((msg) => {
					msg.react('860213325031014500');
					msg.react('860213325072957511');
					setTimeout(() => {
						// eslint-disable-next-line no-unused-vars
						const filterforward = (reaction) => reaction.emoji.id === '860213325072957511';
						console.log(filterforward);

						const collectorforward = msg.createReactionCollector(filterforward, { time: 900000000 });


						// eslint-disable-next-line no-unused-vars
						collectorforward.on('collect', async (r) => {
							if (r.emoji.id == '860213325072957511') {
								if (sayi + 9 < listThree.length) {
									sayi += 9;
								}
								if (message.member.id == client.user.id) {
									return;
								}
								await msg.edit({ embeds: [embed()] });
							}
						});
					}, Number(2000));
					setTimeout(() => {
						// eslint-disable-next-line no-unused-vars

						const filterprevious = (reaction) => reaction.emoji.id === '860213325031014500';

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
					}, Number(2000));
				});
			});
		});
	}
};
