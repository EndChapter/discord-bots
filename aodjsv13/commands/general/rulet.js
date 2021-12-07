/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class RuletCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rulet',
			aliases: ['muterulet', 'muteruleti'],
			group: 'general',
			memberName: 'rulet',
			description: 'İstenilen kullanıcı ile mute ruleti oynar.',
			args: [
				{
					key: 'id',
					prompt: 'Rulet yapılacak kişinin idsini gir veya onu etiketle!',
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
		let memberTarger = message.guild.members.cache.get(id);
		if (!memberTarger) {
			let userid = id.split('').slice(3, 21).join('');

			memberTarger = message.guild.members.cache.get(userid);
			if (!memberTarger) {
				userid = id.split('').slice(2, 20).join('');
				memberTarger = message.guild.members.cache.get(userid);
				if (!memberTarger) {
					message.channel.send('Lütfen geçerli bir id gir ve tekrar dene!');
					return;
				}
			}
		}

		const embed = new MessageEmbed()
			.setColor('#F6F00C')
			.setDescription(`**<@${message.member.user.id}>, <@${memberTarger.user.id}> kullanıcısını Mute Ruletine davet ediyor. Katılmak istiyor musunuz?**`)
			.setImage('https://c.tenor.com/uz1xKkW94s4AAAAC/gun-reload.gif')
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
						await m.channel.send('**Mute Ruletine Katıldınız! **');
						await m.channel.send(`İlk olarak <@${message.member.user.id}> tetiği çekiyor. <:vururum:887839766744268851>	emojisine basarak tetiği çekebilirsiniz.`).then(async (m3) => {
							let sayi = 0;
							const fireEmbed = new MessageEmbed()
								.setDescription('**Ups... Şeytan doldurdu ehehe... Oyunu kaybettin. Ceza olarak sana `5 Dakika` Mute atıyorum.**')
								.setColor('#2874EB')
								.setImage('https://i.imgur.com/Kijn1WM.gif');
							async function loop(m1, us) {
								m1.react('887839766744268851');
								setTimeout(() => {
									const filterttk = (reaction, user) => reaction.emoji.name === 'vururum' && user.id === message.member.user.id;

									const collectorttk = m1.createReactionCollector(filterttk, { time: 60000 });
									collectorttk.on('collect', async (reaction, user) => {
										const randomNumber 	= Math.round(Math.random()) + 1;
										// eslint-disable-next-line max-nested-callbacks
										await m1.channel.send('**Tetik Çekiliyor.**').then(async (m2) => {
											// eslint-disable-next-line max-nested-callbacks
											await setTimeout(async () => {
												await m2.edit('**Tetik Çekiliyor..**');
											}, 500);
											// eslint-disable-next-line max-nested-callbacks
											await setTimeout(async () => {
												await m2.edit('**Tetik Çekiliyor...**');
											}, 1000);
										});
										// eslint-disable-next-line max-nested-callbacks, no-loop-func
										await setTimeout(async () => {
											if (randomNumber == 1) {
												// eslint-disable-next-line max-nested-callbacks
												const emb = new MessageEmbed()
													.setColor('#EB1300')
													.setImage('https://c.tenor.com/3TwQcYolrqMAAAAC/roundtable-theroundtable.gif')
													.setDescription('**Vaay bugün şanslı günündesin ^-^**');
												// eslint-disable-next-line max-nested-callbacks
												await m1.channel.send({ embeds: [emb] }).then(async (m4) => {
													sayi += 1;
													if (sayi % 2 == 0) {
														loop(m4, message.member);
													}
													else if (sayi % 2 == 1) {
														loop(m4, memberTarger);
													}
													else if (sayi == 6) {
														m1.channel.send({ embeds: [fireEmbed] });
														await memberTarger.roles.add('881635348701118476');
														// eslint-disable-next-line max-nested-callbacks
														setTimeout(() => {
															memberTarger.roles.remove('881635348701118476');
														}, 300000);
													}
												});
											}
											else if (randomNumber == 2) {
												m1.channel.send({ embeds: [fireEmbed] });
												await us.roles.add('881635348701118476');
												// eslint-disable-next-line max-nested-callbacks
												setTimeout(() => {
													us.roles.remove('881635348701118476');
												}, 300000);
											}
										}, 1500);
									});
								}, 2000);
							}
							loop(m3, message.member);
						});
					}
				});

				const filterno = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;

				const collectorno = m.createReactionCollector(filterno, { time: 60000 });

				// eslint-disable-next-line no-unused-vars
				collectorno.on('collect', (reaction, user) => {
					if (reaction.emoji.name == '❎') {
						m.channel.send(`**<@${memberTarger.user.id}>, rulet oyununu reddetti!**`);
					}
				});
			}, 2000);
		}).catch((err) => console.error(err));
	}
};
