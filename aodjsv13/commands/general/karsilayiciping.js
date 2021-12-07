/* eslint-disable strict */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class KarsilayicipingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'karsilayiciping',
			memberName: 'karsilayiciping',
			aliases: ['karsilayici'],
			group: 'general',
			description: 'Sunucuda belirli butonları görüntüler. Sadece yöneticiler kullanabilir.',
		});
	}

	async run(message) {
		if (message.member.permissions.has('ADMINISTRATOR') || message.member.user.id == '507232669164109824') {
		// if( message.channel.id === '842784398709751838' ){
			const renk = 'DANGER';
			const button = {
				blurple: new MessageButton()
					.setStyle(renk)
					.setLabel('  » İstek Öneri Ping')
					.setCustomId('888843476161146880')
					.setEmoji('🎁'),
				gray: new MessageButton()
					.setStyle(renk)
					.setLabel('  » Anket Ping')
					.setCustomId('888843437783257229')
					.setEmoji('🎀'),
				green: new MessageButton()
					.setStyle(renk)
					.setLabel('  » Karşılayıcı Ping')
					.setCustomId('881955488743428156')
					.setEmoji('💝'),
				red: new MessageButton()
					.setStyle(renk)
					.setLabel('  » Dead Chat')
					.setCustomId('887823245317918760')
					.setEmoji('🌙'),
				eglence: new MessageButton()
					.setStyle(renk)
					.setLabel('  » Eğlence Bildirim')
					.setCustomId('887822939800608788')
					.setEmoji('880246241538228266'),
				anime: new MessageButton()
					.setStyle(renk)
					.setLabel('  » Anime Bildirim')
					.setCustomId('887823352645951528')
					.setEmoji('881726010905731122'),
			};
			const buttonrow = new MessageActionRow().addComponents(button.blurple, button.gray, button.green);
			const buttonrow2 = new MessageActionRow().addComponents(button.red, button.eglence, button.anime);

			const embed = new MessageEmbed();
			// embed.setTitle(`__${message.guild.name} Karşılayıcı Ping Rolleri__`);
			embed.setTitle('__Ping Rolleri__');
			embed.setColor('#CD0000');
			embed.setDescription('<@&888843476161146880> | Eğer istek veya öneri yapıldığında bildirim almak istiyorsan bu rol tam sana göre!\n\n<@&888843437783257229> | Anket yapıldığında katkın olsun istiyorsan bu rolü almalısın!\n\n<@&881955488743428156> | Sunucuya yeni biri geldiğinde bundan haberdar olmak istersen bu role bir şans vermelisin!\n\n<@&887823245317918760> | Dead Chat timinin bir üyesi olmak ister misin? Alımlar açık!\n\n<@&887822939800608788> | Sunucuda etkinlik yapıldığında bildirim almak istiyorsan bu rolü almalısın!\n\n<@&887823352645951528> | Animeler ile ilgili bildirimler almak istiyorsan bu rolü almalısın!');
			embed.setImage('https://biblionyan.files.wordpress.com/2019/10/original.gif');

			// Embed.setTimestamp();
			await message.channel.send({ embeds: [embed], ephemeral: true, components: [buttonrow, buttonrow2] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');
		}
	}
};
