/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { Command } = require('@sapphire/framework');
const { default: axios } = require('axios');

module.exports = class CashCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cüzdan',
			memberName: 'cüzdan',
			aliases: ['cuzdan', 'para', 'bakiye', 'şüzdan'],
			group: 'general',
			description: 'Kullanıcının aoshi parasını görüntüler.',
		});
	}

	run(message) {
		//! virgül ekle
		let coin = 0;
		axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/${message.member.id}/aoshicoin.json`).then(async (response) => {
			if (response.data == null) {
				coin = 0;
			}
			else {
				coin = response.data.aoshicoin;
			}
			message.channel.send(`<a:aoshi_coin:862724531037405204> ** | ${message.member.user.username},** şu anda **${coin} Aoshi Paran** var!`);
		});
	}
};
