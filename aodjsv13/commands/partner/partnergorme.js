/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class PartnergormeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'partnergorme',
			memberName: 'partnergorme',
			aliases: ['partnergörme'],
			group: 'partner',
			description: 'Sunucuda belirli butonları görüntüler. Sadece yöneticiler kullanabilir.',
		});
	}

	run(message) {
		if (message.member.permissions.has('ADMINISTRATOR') || message.member.user.id == '507232669164109824') {
		// if( message.channel.id === '842784398709751838' ){
			const renk = 'PRIMARY';
			const button = new MessageButton()
				.setStyle(renk)
				.setLabel('  |  Partner')
				.setCustomId('859954731837423616')
				.setEmoji('855069744788406293', true);

			const embed = new MessageEmbed();
			embed.setTitle(`__${message.guild.name} Partner Görme__`);
			embed.setColor('#1e6913');
			embed.setDescription('\n\n**Partnerlik** yapılan sunucuları görmek istiyorsanız lütfen aşağıdaki butona basınız.');
			const row = new MessageActionRow()
				.addComponents(
					button,
				);

			// Embed.setTimestamp();
			message.channel.send({ ephemeral: true, components: [row], embeds: [embed] });
		}
	}
};
