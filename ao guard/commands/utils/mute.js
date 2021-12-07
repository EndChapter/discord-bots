/* eslint-disable max-statements-per-line */
/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			memberName: 'mute',
			group: 'utils',
			description: 'Bir Kullanıcıyı Susturur.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Mutelanacak kullanıcının idsini gir',
					type: 'string',
					default: '',
				},
				{
					key: 'interval',
					prompt: 'Mute süresi?',
					type: 'string',
					default: '',
				},
				{
					key: 'content',
					prompt: 'Mute sebebi?',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, {
		id, content, interval, bot,
	}) {
		const { client } = this;
		if (bot || message.member.hasPermission('KICK_MEMBERS')) {
			if (content == '') {
				// eslint-disable-next-line no-param-reassign
				message.channel.send('**Lütfen sebep girip tekrar deneyiniz. ^-^**');
				return;
			}
			let timeOut = 0;
			let intervalArray = [];
			if (interval !== '') {
				intervalArray = interval.split('');
				const timeType = {
					zero: intervalArray[intervalArray.length - 2],
					one: intervalArray[intervalArray.length - 1],
				};
				intervalArray.pop();
				intervalArray.pop();
				intervalArray = intervalArray.join('');
				timeOut = Number(intervalArray);

				if (timeType.zero.toLowerCase() == 's' && timeType.one.toLowerCase() == 'n') {
					timeOut *= 1000;
				}
				else if (timeType.zero.toLowerCase() == 'd' && timeType.one.toLowerCase() == 'k') {
					timeOut *= 60000;
				}
				else {
					// eslint-disable-next-line prefer-arrow-callback, func-names, no-unused-expressions
					message.channel.send('Geçerli bir zaman giriniz(sn, dk)').then((msg) => { setTimeout(function() { msg.delete; }, Number(2000)); });
				}
			}

			let userid = id.split('').slice(3, 21).join('');
			const guild = this.client.guilds.cache.get('853678199405674517');
			let memberTarger = guild.members.cache.get(userid);
			if (userid == '507232669164109824') {
				await message.channel.send('Bu enayiye mute atamazsın').then((msg) => { setTimeout(function() { message.delete(); msg.delete(); }, Number(3000)); });
				return;
			}
			if (!memberTarger) {
				if (userid == '507232669164109824') {
					await message.channel.send('Bu enayiye mute atamazsın').then((msg) => { setTimeout(function() { message.delete(); msg.delete(); }, Number(3000)); });
					return;
				}
				userid = id.split('').slice(2, 20).join('');
				memberTarger = guild.members.cache.get(userid);
				if (!memberTarger) {
					if (userid == '507232669164109824') {
						await message.channel.send('Bu enayiye mute atamazsın').then((msg) => { setTimeout(function() { message.delete(); msg.delete(); }, Number(3000)); });
						return;
					}
					message.channel.send('Lütfen geçerli bir id gir ve tekrar dene!');
					return;
				}
			}
			const username = memberTarger.user.tag;
			if (!memberTarger.roles.cache.has('855861447946797118')) {
				memberTarger.roles.add('855861447946797118');
				// eslint-disable-next-line prefer-arrow-callback, func-names
				await message.channel.send(`${username} susturuldu!`).then((msg) => { setTimeout(function() { message.delete(); msg.delete(); }); }, Number(3000));

				const channel = guild.channels.cache.get('853692510748934224');
				const embed = new MessageEmbed()
					.setColor('#7A0194')
					.setTitle('❗ >> Yeni Bildiri')
					.setImage('https://i.hizliresim.com/3yadlfk.gif')
					.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
				// .setImage('https://i.pinimg.com/originals/bf/2a/85/bf2a85f922ef8589dd4ccc180edb3e30.gif')
					.setDescription(`${username}, ${message.member.user.username} tarafından susturuldu! Sebebi ise: ${content}`)
					.setTimestamp();
				if (timeOut != 0) {
					embed.addField('Süre:', interval);
					// eslint-disable-next-line prefer-arrow-callback, func-names
					setTimeout(function() {
						memberTarger.roles.remove('855861447946797118');
						// const request = message.member.roles.cache.has('836557251912531968');
					}, Number(timeOut));
				}
				channel.send(embed);
			}
			else {
				// eslint-disable-next-line prefer-arrow-callback, func-names
				await message.channel.send('Bu kullanıcı zaten mute\'lu').then((msg) => { setTimeout(function() { message.delete(); msg.delete(); }, Number(3000)); });
			}
		}
	}
};
