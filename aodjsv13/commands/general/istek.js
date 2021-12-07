/* eslint-disable strict */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');
const { prefix } = require('../../config.js');

module.exports = class İstekCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'istek',
			memberName: 'istek',
			aliases: ['öneri', 'istke'],
			group: 'general',
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

	async run(message, args) {
		if (message.channel.id === '881585368959430696' || message.channel.id === '881508111486189611') {
			const embed = new MessageEmbed()
				.setColor('#10F500')
				.setAuthor(`${message.member.user.tag} - ${message.member.user.id}`, `https://cdn.discordapp.com/avatars/${message.member.user.id}/${message.member.user.avatar}.jpeg`)
				.setDescription(await args.rest('string'))
				.setTimestamp();
			message.channel.send({ content: `${prefix}istek <istek> troll istekler olursa ceza verilecektir.||<@&855940072762507325>||`, embeds: [embed] }).then((m) => {
				m.react('✅');
				m.react('❎');
			}).catch((err) => console.error(err));
			setTimeout(()=> {
				message.delete();
			}, 100);
		}
	}
};
