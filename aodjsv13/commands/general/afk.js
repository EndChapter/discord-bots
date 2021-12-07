/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');
const { afk } = require('../../app.config.json');
const { default: axios } = require('axios');


module.exports = class AfkCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'afk',
			memberName: 'afk',
			aliases: ['Afk', 'AFK'],
			group: 'general',
			description: 'Tüm Sunucunun Level Durumunu Görüntüler.',
		});
	}

	async run(message, args) {
		const content = await args.rest('string');
		const afk = {
			content,
			nickname: message.member.nickname == null ? message.member.user.username : message.member.nickname,
		};
		await message.member.setNickname('[AFK]' + (message.member.nickname == null || message.member.nickname.startsWith('[AFK]') ? message.member.user.username : message.member.nickname));
		const embed = new MessageEmbed();
		embed.setColor('#FDF10D');
		embed.setDescription(`${message.member.nickname} AFK kaldı sebebi ise: ${content}`);
		embed.setTimestamp();
		message.channel.send({ embeds: [embed] });
	}
};
