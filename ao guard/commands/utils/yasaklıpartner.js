/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { default: axios } = require('axios');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'yasakpartner',
			memberName: 'yasakpartner',
			aliases: ['yasaklıpartner', 'yasaklipartner'],
			group: 'utils',
			description: 'Mesaj kanalından yasaklı kelimeleri belirler',
			guildOnly: true,
			args: [
				{
					key: 'eklecikar',
					prompt: 'Eklemek mi istiyorsun çıkarmak mı?',
					type: 'string',
					default: 'ekle',
				},
				{
					key: 'kelime',
					prompt: 'Eklemek istediğin kelimeyi sıradaki mesajında yaz.',
					type: 'string',
				},
			],

		});
	}

	run(message, { eklecikar, kelime }) {
		if (message.member.hasPermission('ADMINISTRATOR') || message.member.user.id == '507232669164109824') {
			if (eklecikar.toLowerCase() == 'ekle') {
				let post = true;
				for (let i = 0; i < global.bannedServers.length; i += 1) {
					if (global.bannedServers[i] == kelime) {
						post = false;
					}
				}
				if (post) {
					axios.post('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/bannedServers.json', { kelime }).then((response) => {
						if (response.status == 200) {
							global.bannedServers.push(kelime);
							message.channel.send(`Yasaklı partner: \`${kelime}\` yasaklı partner listesine başarı ile eklendi!`);
						}
						else {
							message.channel.send(`Yasaklı partner: \`${kelime}\` eklenirken bir sorun oluşmuş olabilir yönetici ile iletişime geçin!`);
						}
					}).catch(() => {
						message.channel.send(`Yasaklı partner: ${kelime} eklenirken bir sorun oluştu yönetici ile iletişime geçin!`);
					});
				}
				else {
					message.channel.send(`Yasaklı partner: ${kelime} zaten yasaklı partner listesinde var!`);
				}
			}
			else if (eklecikar.toLowerCase() == 'çıkar' || eklecikar.toUpperCase == 'ÇIKAR') {
				const bannedWordIDs = [];
				axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/bannedServers.json').then((response) => {
					if (response.data == null) {
						// post = true;
					}
					else {
						let id = false;
						for (const key in response.data) {
							bannedWordIDs.push({ id: key, kelime: response.data[key].kelime });
						}
						for (let i = 0; i < bannedWordIDs.length; i += 1) {
							if (bannedWordIDs[i].kelime == kelime) {
								id = bannedWordIDs[i].id;
							}
						}
						if (id) {
							// eslint-disable-next-line no-shadow
							axios.delete(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/bannedServers/${id}.json`).then((response) => {
								if (response.status == 200) {
									message.channel.send(`Yasaklı partner: \`${kelime}\` yasaklı partner listesinden başarı ile çıkartıldı!`);
									const index = global.bannedServers.indexOf(kelime);
									if (index > -1) {
										global.bannedServers.splice(index, 1);
									}
								}
								else {
									message.channel.send(`Yasaklı partner: \`${kelime}\` çıkarılırken bir sorun oluşmuş olabilir yönetici ile iletişime geçin!`);
								}
							}).catch(() => {
								message.channel.send(`Yasaklı partner: \`${kelime}\` çıkarılırken bir sorun oluştu yönetici ile iletişime geçin!`);
							});
						}
						else {
							message.channel.send(`Yasaklı partner olduğunu belirttiğiniz \`${kelime}\` yasaklı partnerler listesinde bulunamadı!`);
						}
					}
				});
			}
		}
		else {
			message.channel.send('Bunu yapmana iznin yok!');
		}
	}
};
