/* eslint-disable max-statements-per-line */
/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
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
					message.channel.send('Geçerli bir zaman giriniz(sn, dk)').then((msg) => { client.setTimeout(function() { msg.delete; }, Number(2000)); });
				}
			}

			let userid = id.split('').slice(3, 21).join('');
			const guild = this.client.guilds.cache.get('842425040409460757');
			let memberTarger = guild.members.cache.get(userid);
			if (!memberTarger) {
				userid = id.split('').slice(2, 20).join('');
				memberTarger = guild.members.cache.get(userid);
				if (!memberTarger) {
					message.channel.send('Lütfen geçerli bir id gir ve tekrar dene!');
					return;
				}
			}
			const username = memberTarger.user.tag;
			if (!memberTarger.roles.cache.has('845809890529116181')) {
				memberTarger.roles.add('845809890529116181');
				// eslint-disable-next-line prefer-arrow-callback, func-names
				await message.channel.send(`${username} susturuldu!`).then((msg) => { client.setTimeout(function() { message.delete(); msg.delete(); }); }, Number(3000));

				const channel = guild.channels.cache.get('842819414663626772');
				if (content == '') {
					// eslint-disable-next-line no-param-reassign
					content = 'belirtilmedi';
				}
				const embed = new MessageEmbed()
					.setColor('#000000')
					.setTitle('❗ >> Yeni Bildiri')
					.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
					.setThumbnail('https://i.hizliresim.com/srxe7cx.gif')
				// .setImage('https://i.pinimg.com/originals/bf/2a/85/bf2a85f922ef8589dd4ccc180edb3e30.gif')
					.setDescription(`${username} susturuldu!\n Sebep: ${content}`)
					.setTimestamp();
				if (timeOut != 0) {
					embed.addField('Süre:', interval);
					const botname = this.client.user.username;
					const boturl = this.client.user.displayAvatarURL();
					// eslint-disable-next-line prefer-arrow-callback, func-names
					client.setTimeout(function() {
						memberTarger.roles.remove('845809890529116181');
						// const request = message.member.roles.cache.has('836557251912531968');
						const embedOne = new MessageEmbed()
							.setColor('#000000')
							.setTitle('❗ >> Yeni Bildiri')
						// .setImage('https://i.pinimg.com/originals/bf/2a/85/bf2a85f922ef8589dd4ccc180edb3e30.gif')
							.setAuthor(botname, boturl)
							.setThumbnail('https://i.hizliresim.com/srxe7cx.gif')
							.setDescription(`${username} kullanıcısının susturulması kaldırıldı...`)
							.setTimestamp();
						channel.send(embedOne);
					}, Number(timeOut));
				}
				channel.send(embed);
			}
			else {
				// eslint-disable-next-line prefer-arrow-callback, func-names
				await message.channel.send('Bu kullanıcı zaten mute\'lu').then((msg) => { client.setTimeout(function() { message.delete(); msg.delete(); }, Number(3000)); });
			}
		}
	}
};
