/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class SesecekCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sesecek',
			aliases: ['çek', 'cek', 'seseçek'],
			group: 'general',
			memberName: 'sesecek',
			description: 'İstenilen kullanıcıyı istenilen kalana çeker.',
			args: [
				{
					key: 'id',
					prompt: 'Sese çekilecek kişinin idsini gir veya onu etiketle!',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, args) {
		const id = await args.rest('string');
		const { client } = this.container;
		const guild = client.guilds.cache.get('853678199405674517');
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
		if (message.member.voice != undefined && memberTarger.voice.channel != undefined) {
			if (message.member.voice.channel != null) {
				if (memberTarger.voice.channel != null) {
					if (message.member.voice.channel.permissionsFor(client.user.id).has(['MOVE_MEMBERS'])) {
						const embed = new MessageEmbed()
							.setColor('#7274ff')
							.setDescription(`<@${memberTarger.user.id}>, <@${message.member.user.id}> sizi <#${message.member.voice.channel.id}> kanalına çekmek istiyor kabul ediyor musunuz?`)
							.setTimestamp();
						message.channel.send({ embeds: [embed] }).then((m) => {
							m.react('✅');
							m.react('❎');
							setTimeout(()=> {
								const filteryes = (reaction, user) => reaction.emoji.name === '✅' && user.id === memberTarger.user.id;

								const collectoryes = m.createReactionCollector(filteryes, { time: 60000 });

								// eslint-disable-next-line no-unused-vars
								collectoryes.on('collect', async (reaction, user) => {
									if (reaction.emoji.name == '✅') {
										memberTarger.voice.setChannel(message.member.voice.channel.id);
									}
								});

								const filterno = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;

								const collectorno = m.createReactionCollector(filterno, { time: 60000 });

								// eslint-disable-next-line no-unused-vars
								collectorno.on('collect', (reaction, user) => {
									if (reaction.emoji.name == '❎') {
										m.channel.send(`<@${memberTarger.user.id}>, kişisini <#${message.member.voice.channel.id}> kanalına çekme isteği <@${memberTarger.user.id}> tarafından reddedildi!`).then((msg) => {
											setTimeout(() => {
												msg.delete();
											}, 5000);
										});
									}
								});
								setTimeout(() => {
									message.channel.send('İstek zaman aşımına uğradı lütfen daha sonra tekrar deneyin!').then((msg) => {
										setTimeout(() => {
											msg.delete();
										}, 5000);
									});
									m.delete();
								}, 60000);
							}, 2000);
						}).catch((err) => console.error(err));
					}
					else {
						message.channel.send('Bu kanalda sunucu üyelerini taşıma yetkim yok!').then((msg) => {
							setTimeout(() => {
								msg.delete();
							}, 5000);
						});
					}
				}
				else {
					message.channel.send('Bunu yapabilmen için sese çektiğin kişi ses kanalında olmalı!').then((msg) => {
						setTimeout(() => {
							msg.delete();
						}, 5000);
					});
				}
			}
			else {
				message.channel.send('Bunu yapabilmek için önce bir ses kanalına girmelisin!').then((m) => {
					setTimeout(() => {
						m.delete();
					}, 5000);
				});
			}
		}
		else {
			message.channel.send('Bunu yapabilmek için sen veya sese çekeceğin kişi ses kanalında olmalı!').then((m) => {
				setTimeout(() => {
					m.delete();
				}, 5000);
			});
		}
	}
};
