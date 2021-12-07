/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { default: axios } = require('axios');

module.exports = class daily extends Command {
	constructor(client) {
		super(client, {
			name: 'daily',
			memberName: 'daily',
			aliases: ['daliy', 'adily'],
			group: 'eglence',
			description: 'Kullanıcının günlük yuyunarını verir.',
		});
	}

	run(message) {
		const dailyCoin = Math.floor(Math.random() * 75) + 75;
		// miliseconds
		const oneDay = 86400000;
		const embed = new MessageEmbed();
		embed.setColor('#000000');
		embed.setDescription();
		//
		axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.member.id}/yuyu.json`).then(async (response) => {
			if (response.data == null) {
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.member.id}/yuyu.json`, { yuyunar: dailyCoin, daily: { timestamp: Date.now() } });
				message.channel.send(`**${message.member.user.username}** İşte günlük ikramiyen: <a:yuyunar:851276921659850782> **${dailyCoin} Yuyunar**`);
			}
			else {
				const { timestamp } = response.data.daily;
				if (timestamp + Number(oneDay) < Date.now()) {
					let { yuyunar } = response.data;
					yuyunar += dailyCoin;
					await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.member.id}/yuyu.json`, { yuyunar, daily: { timestamp: Date.now() } });
					message.channel.send(`**${message.member.user.username}** İşte günlük ikramiyen: <a:yuyunar:851276921659850782> **${dailyCoin} Yuyunar**\nToplamda ${yuyunar}<a:yuyunar:851276921659850782> Yuyunar'ın var. <:zipizy:842515515645624331><`);
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

					message.channel.send(`Sonraki ikramiyeni almadan önce **${hour} saat ${minutes} dakika ${seconds} saniye** beklemelisin. <:zipizy:842515515645624331><a:yerindeduramiyor:842889685323612161><a:emoji_19:842889656366661644>`);
				}
			}
		});
	}
};
