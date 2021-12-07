/* eslint-disable strict */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class AyracCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayrac',
			memberName: 'ayrac',
			aliases: ['ayraclar'],
			group: 'general',
			description: 'Sunucuda belirli butonları görüntüler. Sadece yöneticiler kullanabilir.',
		});
	}

	run(message) {
		if (message.member.permissions.has('ADMINISTRATOR') || message.member.user.id == '507232669164109824') {
		// if( message.channel.id === '842784398709751838' ){
			const renk = 'DANGER';
			const button = {
				blurple: new MessageButton()
					.setStyle(renk)
					.setLabel('  » ╭━━━━━━━━━━━(ツタ)')
					.setCustomId('879804829130719253')
					.setEmoji('888884539466866738'),
				gray: new MessageButton()
					.setStyle(renk)
					.setLabel('  » ╭━━━━━━━━━━━(ツタ)')
					.setCustomId('881955632444489768')
					.setEmoji('888884539433287700'),
				green: new MessageButton()
					.setStyle(renk)
					.setLabel('  » ╭━━━━━━━━━━━(ツタ)')
					.setCustomId('887822674510888990')
					.setEmoji('888884539143884861'),
			};
			const buttonrow = new MessageActionRow().addComponents(button.blurple, button.gray, button.green);

			const embed = new MessageEmbed();
			// embed.setTitle(`__${message.guild.name} Karşılayıcı Ping Rolleri__`);
			embed.setTitle('__Ayraç Rolleri__');
			embed.setColor('#CD0000');
			embed.setDescription('<a:a1:888884539466866738> | <@&879804829130719253>!\n\n<a:a2:888884539433287700> | <@&881955632444489768>!\n\n<a:a3:888884539143884861> | <@&887822674510888990>!');
			embed.setImage('https://biblionyan.files.wordpress.com/2019/10/original.gif');

			// Embed.setTimestamp();
			message.channel.send({ embeds: [embed], ephemeral: true, components: [buttonrow] });
		}
	}
};
