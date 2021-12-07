/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class TicketCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ticket',
			aliases: ['bilet'],
			group: 'general',
			memberName: 'ticket',
			description: 'Ticket Embedini gönderir sadece yöneticiler kullanabilir.',
		});
	}

	run(message) {
		const embed = new MessageEmbed()
			.setColor('#ffffff')
			.setDescription('**Aoshima Ticket Açma**\n\nŞikayetiniz ya da sorunlarınız varsa sunucu hakkında aşağıdaki butona basınız. Yetkili ekibimiz size yardımcı olmaya çalışacaktır.');
		const button = new MessageButton()
			.setCustomId('77777777777777')
			.setLabel('| Ticket açmak için butona basınız')
			.setStyle('PRIMARY')
			.setEmoji('874080237351235614');
		const row = new MessageActionRow()
			.addComponents(
				button,
			);
		message.channel.send({ ephemeral: true, components: [row], embeds: [embed] });
	}
};
