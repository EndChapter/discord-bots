/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'unban',
			memberName: 'unban',
			group: 'utils',
			description: 'Bir Kullanıcının Banını Kaldırır.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Unbanlanacak kullanıcının idsini gir',
					type: 'string',
				},
			],

		});
	}

	run(message, { id }) {
		const { client } = this;
		// const request = message.member.roles.cache.has('836557251912531968');
		if (message.member.hasPermission('BAN_MEMBERS')) {
			message.guild.fetchBans().then((bans) => {
				const channel = message.guild.channels.cache.get('846077502295113738');
				if (bans.size == 0) return;
				const bUser = bans.find((b) => b.user.id == id);
				if (!bUser) return;
				message.guild.members.unban(bUser.user);
				// eslint-disable-next-line max-statements-per-line, prefer-arrow-callback, func-names
				message.channel.send(`${id}'nin banı kaldırıldı`).then((msg) => client.setTimeout(function() { message.delete(); msg.delete(); }, Number(3000)));
				const embed = new MessageEmbed()
					.setColor('#000000')
					.setTitle('❗ >> Yeni Bildiri')
				// .setImage('https://i.pinimg.com/originals/bf/2a/85/bf2a85f922ef8589dd4ccc180edb3e30.gif')*-
					.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
					.setThumbnail('https://i.hizliresim.com/srxe7cx.gif')
					.setDescription(`${id} idsine sahip kullanıcının banı kaldırıldı...`)
					.setTimestamp();
				channel.send(embed);
			});
		}
	}
};
