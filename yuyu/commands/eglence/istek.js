/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { prefix } = require('../../config.json');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'istek',
			memberName: 'istek',
			aliases: ['öneri', 'istke'],
			group: 'eglence',
			description: 'Kullanıcının istediği bir isteği çalıştırır.',
			args: [
				{
					key: 'text',
					prompt: 'Hangi isteği göndermek istersin?',
					type: 'string',
				},
			],
		});
	}

	run(message, { text }) {
		if (message.channel.id === '842770179791388672' || message.channel.id === '692524509017931806') {
			const embed = new MessageEmbed()
				.setColor('#7274ff')
				.setTitle('❗ >> Yeni Bildiri')
				.setAuthor(`${message.author.tag} - ${message.member.user.id}`, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
				.setDescription(text)
				.setTimestamp();
			message.say(`${prefix}istek <istek> troll istekler olursa ceza verilecektir.`, { embed }).then((m) => {
				m.react('✅');
				m.react('❎');
			}).catch((err) => console.error(err));
			message.delete({ timeout: 100 });
		}
	}
};
