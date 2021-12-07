/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { Command } = require('discord.js-commando');
const { default: axios } = require('axios');

module.exports = class cash extends Command {
	constructor(client) {
		super(client, {
			name: 'cash',
			memberName: 'cash',
			aliases: ['yuyunar', 'para'],
			group: 'eglence',
			description: 'Kullanıcının yuyunarını görüntüler.',
		});
	}

	run(message) {
		//! virgül ekle
		let coin = 0;
		axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.member.id}/yuyu.json`).then(async (response) => {
			if (response.data == null) {
				coin = 0;
			}
			else {
				coin = response.data.yuyunar;
			}
			message.channel.send(`<a:yuyunar:851276921659850782> ** | ${message.member.user.username},** şu anda **${coin} Yuyunar**'ın var!`);
		});
	}
};
