/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { Command } = require('@sapphire/framework');
const { default: axios } = require('axios');

module.exports = class DailyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'günlük',
			memberName: 'günlük',
			aliases: ['daliy', 'adily', 'daily', 'gunluk'],
			group: 'general',
			description: 'Kullanıcının günlük aoshi parasını verir.',
		});
	}

	run(message) {
		const dailyCoin = Math.floor(Math.random() * 75) + 75;
		// miliseconds
		const oneDay = 86400000;
		//
		axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/${message.member.id}/aoshicoin.json`).then(async (response) => {
			if (response.data == null) {
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/${message.member.id}/aoshicoin.json`, { aoshicoin: dailyCoin, daily: { timestamp: Date.now() } });
				message.channel.send(`**${message.member.user.username}** İşte günlük ikramiyen: <a:aoshi_coin:862724531037405204> **${dailyCoin} Aoshi Parası**`);
			}
			else {
				const { timestamp } = response.data.daily;
				if (timestamp + Number(oneDay) < Date.now()) {
					let { aoshicoin } = response.data;
					aoshicoin += dailyCoin;
					await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/${message.member.id}/aoshicoin.json`, { aoshicoin, daily: { timestamp: Date.now() } });
					message.channel.send(`**${message.member.user.username}** İşte günlük ikramiyen: <a:aoshi_coin:862724531037405204> **${dailyCoin} Aoshi Parası**\nToplamda ${aoshicoin}<a:aoshi_coin:862724531037405204> Aoshi Paran var.`);
				}
				else {
					const oneHour = 3600000;
					const oneMinute = 60000;
					const oneSecond = 1000;

					const remainder = timestamp + Number(oneDay) - Date.now();

					const hour = Math.floor(remainder / oneHour);

					const minutes = Math.floor((remainder - (hour * oneHour)) / oneMinute);

					// eslint-disable-next-line max-len
					const seconds = Math.floor((remainder - (hour * oneHour) - (minutes * oneMinute)) / oneSecond);

					message.channel.send(`Sonraki ikramiyeni almadan önce **${hour} saat ${minutes} dakika ${seconds} saniye** beklemelisin.`);
				}
			}
		});
	}
};
