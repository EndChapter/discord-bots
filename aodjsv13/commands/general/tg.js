/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class TgCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tg',
			aliases: ['together', 'discordtogether'],
			group: 'general',
			memberName: 'tg',
			description: 'İstenilen kullanıcıyı istenilen kalana çeker.',
			args: [
				{
					key: 'id',
					prompt: 'Sese çekilecek kişinin idsini gir veya onu etiketle!',
					type: 'string',
					default: '',
				},
			],
		});
	}

	run(message, { id }) {
		const { client } = this.container;
		if (id == 'yt') {
			console.log(id);
			if (message.member.voice.channel) {
				client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async (invite) => message.channel.send(`${invite.code}`));
			}
		}
		else if (id == 'poker') {
			if (message.member.voice.channel) {
				client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async (invite) => message.channel.send(`${invite.code}`));
			}
		}
		else if (id == 'chess') {
			if (message.member.voice.channel) {
				client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async (invite) => message.channel.send(`${invite.code}`));
			}
		}
		else if (id == 'chessDev') {
			if (message.member.voice.channel) {
				client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chessDev').then(async (invite) => message.channel.send(`${invite.code}`));
			}
		}
		else if (id == 'betrayal') {
			if (message.member.voice.channel) {
				client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async (invite) => message.channel.send(`${invite.code}`));
			}
		}
		else if (id == 'fishing') {
			if (message.member.voice.channel) {
				client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async (invite) => message.channel.send(`${invite.code}`));
			}
		}
	}
};
