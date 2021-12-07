/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'unmute',
			memberName: 'unmute',
			group: 'utils',
			description: 'Bir Kullanıcının Susturulmasını Kaldırır.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Mute\'u kaldırılacak kullanıcının idsini gir',
					type: 'string',
				},
			],


			userPermissions: ['KICK_MEMBERS'],
		});
	}

	run(message, { id }) {
		const { client } = this;
		if (message.member.hasPermission('KICK_MEMBERS')) {
			let userid = id.split('').slice(3, 21).join('');

			let memberTarger = message.guild.members.cache.get(userid);
			if (!memberTarger) {
				userid = id.split('').slice(2, 20).join('');
				memberTarger = message.guild.members.cache.get(userid);
				if (!memberTarger) {
					message.channel.send('Lütfen geçerli bir id gir ve tekrar dene!');
					return;
				}
			}
			const username = memberTarger.user.tag;
			if (memberTarger.roles.cache.has('845809890529116181')) {
				// eslint-disable-next-line prefer-arrow-callback, max-statements-per-line, func-names
				message.channel.send(`${username} kullanıcısının susturulması kaldırıldı!`).then((msg) => client.setTimeout(function() { message.delete(); msg.delete(); }), Number(3000));
				memberTarger.roles.remove('845809890529116181');
				const channel = message.guild.channels.cache.get('842819414663626772');
				// const request = message.member.roles.cache.has('836557251912531968');
				const embed = new MessageEmbed()
					.setColor('#000000')
					.setTitle('❗ >> Yeni Bildiri')
				// .setImage('https://i.pinimg.com/originals/bf/2a/85/bf2a85f922ef8589dd4ccc180edb3e30.gif')
					.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
					.setThumbnail('https://i.hizliresim.com/srxe7cx.gif')
					.setDescription(`${username} kullanıcısının susturulması kaldırıldı...`)
					.setTimestamp();
				channel.send(embed);
				// const request = message.member.roles.cache.has('836557251912531968');
			}
			else {
				// eslint-disable-next-line prefer-arrow-callback, max-statements-per-line, func-names
				message.channel.send('Bu kullanıcı mute\'lu değil').then((msg) => client.setTimeout(function() { message.delete(); msg.delete(); }), Number(3000));
			}
		}
	}
};
