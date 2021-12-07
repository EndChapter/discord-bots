/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { Command } = require('discord.js-commando');
const { default: axios } = require('axios');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'spam',
			memberName: 'spam',
			group: 'utils',
			description: 'Sunucudaki spam özelliğini açar.',
			guildOnly: true,
			args: [
				{
					key: 'text',
					prompt: 'Spam özelliği açılsın mı kapansın mı?(Açık/Kapalı)',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			if (global.spamkey == '') {
				axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/spam.json').then((response) => {
					for (const key in response.data) {
						global.spamkey = key;
					}
				});
			}
			if (text == 'aç' || text == 'açık') {
				global.spam = true;
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/spam/${global.spamkey}.json`, { spam: true }).catch((e) => { console.log(e); });
				message.channel.send('Spam özelliği başarı ile açıldı!');
			}
			else if (text == 'kapat' || text == 'kapalı') {
				global.spam = false;
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/spam/${global.spamkey}.json`, { spam: false }).catch((e) => { console.log(e); });
				message.channel.send('Spam özelliği başarı ile kapatıldı!');
			}
		}
	}
};
