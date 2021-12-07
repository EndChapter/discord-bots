/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { default: axios } = require('axios');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'yasakkelime',
			memberName: 'yasakkelime',
			aliases: ['yasakelime', 'yasaklikelime', 'yasaklıkelime'],
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
		if (message.member.hasPermission('ADMINISTRATOR')) {
			if (eklecikar.toLowerCase() == 'ekle') {
				let post = true;
				for (let i = 0; i < global.bannedWords.length; i += 1) {
					if (global.bannedWords[i] == kelime) {
						post = false;
					}
				}
				if (post) {
					axios.post('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/yasaklikelime.json', { kelime }).then((response) => {
						if (response.status == 200) {
							global.bannedWords.push(kelime);
							message.channel.send(`Yasaklı kelime: \`${kelime}\` yasaklı kelime listesine başarı ile eklendi!`);
						}
						else {
							message.channel.send(`Yasaklı kelime: \`${kelime}\` eklenirken bir sorun oluşmuş olabilir yönetici ile iletişime geçin!`);
						}
					}).catch(() => {
						message.channel.send(`Yasaklı kelime: ${kelime} eklenirken bir sorun oluştu yönetici ile iletişime geçin!`);
					});
				}
				else {
					message.channel.send(`Yasaklı kelime: ${kelime} zaten yasaklı kelime listesinde var!`);
				}
			}
			else if (eklecikar.toLowerCase() == 'çıkar' || eklecikar.toUpperCase == 'ÇIKAR') {
				const bannedWordIDs = [];
				axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/yasaklikelime.json').then((response) => {
					if (response.data == null) {
						// post = true;
						bannedWordIDs.push('rastgele');
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
							axios.delete(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/yasaklikelime/${id}.json`).then((response) => {
								if (response.status == 200) {
									message.channel.send(`Yasaklı kelime: \`${kelime}\` yasaklı kelime listesinden başarı ile çıkartıldı!`);
									const index = global.bannedWords.indexOf(kelime);
									if (index > -1) {
										global.bannedWords.splice(index, 1);
									}
								}
								else {
									message.channel.send(`Yasaklı kelime: \`${kelime}\` çıkarılırken bir sorun oluşmuş olabilir yönetici ile iletişime geçin!`);
								}
							}).catch(() => {
								message.channel.send(`Yasaklı kelime: \`${kelime}\` çıkarılırken bir sorun oluştu yönetici ile iletişime geçin!`);
							});
						}
						else {
							message.channel.send(`Yasaklı kelime olduğunu belirttiğiniz \`${kelime}\` yasaklı kelimeler listesinde bulunamadı!`);
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
