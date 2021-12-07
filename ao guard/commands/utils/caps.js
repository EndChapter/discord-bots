/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { Command } = require('discord.js-commando');
const { default: axios } = require('axios');

module.exports = class caps extends Command {
	constructor(client) {
		super(client, {
			name: 'caps',
			memberName: 'caps',
			group: 'utils',
			description: 'Sunucudaki Caps Lock engelleme özelliğini açar.',
			guildOnly: true,
			args: [
				{
					key: 'text',
					prompt: 'Caps Lock engelleme özelliği açılsın mı kapansın mı?(Açık/Kapalı)',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		if (message.member.hasPermission('ADMINISTRATOR') || message.member.user.id == '507232669164109824' || message.member.roles.cache.has('854340781443776542')) {
			if (global.capskey == '') {
				axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/caps.json').then((response) => {
					for (const key in response.data) {
						global.capskey = key;
					}
				});
			}
			if (text == 'aç' || text == 'açık') {
				global.caps = true;
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/caps/${global.capskey}.json`, { caps: true }).catch((e) => { console.log(e); });
				message.channel.send('Caps Lock engelleme özelliği başarı ile açıldı!');
			}
			else if (text == 'kapat' || text == 'kapalı') {
				global.caps = false;
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/caps/${global.capskey}.json`, { caps: false }).catch((e) => { console.log(e); });
				message.channel.send('Caps Lock engelleme özelliği başarı ile kapatıldı!');
			}
		}
	}
};
