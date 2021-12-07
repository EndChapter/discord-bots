/* eslint-disable strict */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class ButtonsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'buttons',
			memberName: 'buttons',
			aliases: ['buton', 'button'],
			group: 'general',
			description: 'Sunucuda belirli butonları görüntüler. Sadece yöneticiler kullanabilir.',
		});
	}

	async run(message) {
		if (message.member.permissions.has('ADMINISTRATOR') || message.member.user.id === '507232669164109824') {
			// if(message.channel.id === '842784398709751838'){
			const renk = 'SUCCESS';
			const embedColor = '#1A7939';
			const embedImage = 'https://i.hizliresim.com/mx44c7z.gif';
			const button = {
				color1: new MessageButton()
					.setStyle(renk)
					.setLabel('|  Açık Pembe')
					.setCustomId('881582444325773432')
					.setEmoji('881650612268331008'),
				color2: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Açık Mor')
					.setCustomId('881582750644191233')
					.setEmoji('881651241296461895'),
				color3: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Açık Yeşil')
					.setCustomId('881583155147059241')
					.setEmoji('881651563217694822'),
				color4: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Açık Sarı')
					.setCustomId('881586848269488229')
					.setEmoji('881652609709129808'),
				color5: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Açık Kırmızı')
					.setCustomId('881583860184408065')
					.setEmoji('881653935880941569'),
				color6: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Açık Turuncu')
					.setCustomId('881583641912819743')
					.setEmoji('881654248792805386'),
				color7: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Açık Mavi')
					.setCustomId('881582976356450373')
					.setEmoji('881654522022346773'),
				color8: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Açık Turkuaz')
					.setCustomId('881592495098716250')
					.setEmoji('881654818597388289'),
				color9: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Pembe')
					.setCustomId('881584398657544254')
					.setEmoji('881655152891805696'),
				color10: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Kırmızı')
					.setCustomId('881595217344593960')
					.setEmoji('881656436361424937'),
				color11: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Mor')
					.setCustomId('881593302464483339')
					.setEmoji('881655243434254427'),
				color12: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yeşil')
					.setCustomId('881594386603991040')
					.setEmoji('881655483826601985'),
				color13: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Sarı')
					.setCustomId('881594805845626990')
					.setEmoji('881655849578279094'),
				color14: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Turuncu')
					.setCustomId('881595000750747689')
					.setEmoji('881656601944150037'),
				color15: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Mavi')
					.setCustomId('881593695269445693')
					.setEmoji('881656695623942195'),
				color16: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Turkuaz')
					.setCustomId('881595480201637929')
					.setEmoji('881656881020534814'),
				color17: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koyu Pembe')
					.setCustomId('881595943433146410')
					.setEmoji('881657142212431902'),
				color18: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koyu Mor')
					.setCustomId('881596380475445259')
					.setEmoji('881657282465763378'),
				color19: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koyu Yeşil')
					.setCustomId('881596684180791346')
					.setEmoji('881657451420717078'),
				color20: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koyu Sarı')
					.setCustomId('881597094417272833')
					.setEmoji('881657609822830632'),
				color21: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koyu Kırmızı')
					.setCustomId('881597529408552981')
					.setEmoji('881657927226773524'),
				color22: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koyu Turuncu')
					.setCustomId('881597989456596992')
					.setEmoji('881658220723179551'),
				color23: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koyu Mavi')
					.setCustomId('881598214262894612')
					.setEmoji('881658273848229889'),
				color24: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koyu Turkuaz')
					.setCustomId('881598300841726073')
					.setEmoji('881658325958271018'),
				color25: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Rainbow')
					.setCustomId('881598866997248000')
					.setEmoji('881659057902067784'),
				color26: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Gri')
					.setCustomId('881598779168534569')
					.setEmoji('881658719270756373'),
				color27: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Beyaz')
					.setCustomId('881598655990218873')
					.setEmoji('881658393008406558'),
				color28: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Siyah')
					.setCustomId('880189143337037874')
					.setEmoji('881658582855196733'),
			};
			const colors = {
				color1: '<a:acikpembe:881650612268331008>',
				color2: '<a:acikmor:881651241296461895>',
				color3: '<a:acikyesil:881651563217694822>',
				color4: '<a:aciksarifly:881652609709129808>',
				color5: '<a:acikkirmizi:881653935880941569>',
				color6: '<a:acikturuncu:881654248792805386>',
				color7: '<a:acikmavi:881654522022346773>',
				color8: '<a:acikturkuaz:881654818597388289>',
				color9: '<a:pembe:881655152891805696>',
				color10: '<a:kirmizi:881656436361424937>',
				color11: '<a:mor:881655243434254427>',
				color12: '<a:yesil:881655483826601985>',
				color13: '<a:sari:881655849578279094>',
				color14: '<a:turuncu:881656601944150037>',
				color15: '<a:mavi:881656695623942195>',
				color16: '<a:turkuaz:881656881020534814>',
				color17: '<a:koyupembe:881657142212431902>',
				color18: '<a:koyumor:881657282465763378>',
				color19: '<a:koyuyesil:881657451420717078>',
				color20: '<a:koyusari:881657609822830632>',
				color21: '<a:koyukirmizi:881657927226773524> ',
				color22: '<a:koyuturuncu:881658220723179551> ',
				color23: '<a:koyumavi:881658273848229889> ',
				color24: '<a:koyuturkuaz:881658325958271018>',
				color25: '<a:rainbow:881659057902067784>',
				color26: '<a:gri:881658719270756373>',
				color27: '<a:beyaz:881658393008406558>',
				color28: '<a:siyah:881658582855196733>',
			};
			const buttonRows = {
				butttonRowOne: new MessageActionRow().addComponents(button.color1, button.color2, button.color3, button.color4),
				butttonRowTwo: new MessageActionRow().addComponents(button.color5, button.color6, button.color7, button.color8),
				butttonRowThree: new MessageActionRow().addComponents(button.color9, button.color10, button.color11, button.color12),
				butttonRowFour: new MessageActionRow().addComponents(button.color13, button.color14, button.color15, button.color16),
				butttonRowFive: new MessageActionRow().addComponents(button.color17, button.color18, button.color19, button.color20),
				butttonRowSix: new MessageActionRow().addComponents(button.color21, button.color22, button.color23, button.color24),
				butttonRowSeven: new MessageActionRow().addComponents(button.color25, button.color26, button.color27, button.color28),
			};
			const embed = new MessageEmbed();
			embed.setTitle('__Leveliniz Olmadan Alabileceğiniz Renkler__');
			embed.setColor(embedColor);
			embed.setDescription(`╭✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚\n│୨୧︰${colors.color1}・<@&${button.color1.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color2}・<@&${button.color2.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color3}・<@&${button.color3.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color4}・<@&${button.color4.customId}>\n│------------ ♡ ------------\n╰✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚`);
			embed.setImage(embedImage);
			await message.channel.send({ components: [buttonRows.butttonRowOne], embeds: [embed], ephemeral: true });
			await message.channel.send('https://i.hizliresim.com/owtmf5m.gif');

			const embedOne = new MessageEmbed();
			embedOne.setTitle('__5 Levelde Alabileceğiniz Renkler__');
			embedOne.setColor(embedColor);
			embedOne.setDescription(`╭✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚\n│୨୧︰${colors.color5}・<@&${button.color5.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color6}・<@&${button.color6.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color7}・<@&${button.color7.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color8}・<@&${button.color8.customId}>\n│------------ ♡ ------------\n╰✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚`);
			embedOne.setImage(embedImage);

			await message.channel.send({ components: [buttonRows.butttonRowTwo], embeds: [embedOne], ephemeral: true });
			await message.channel.send('https://i.hizliresim.com/owtmf5m.gif');

			const embedTwo = new MessageEmbed();
			embedTwo.setTitle('__15 Levelde Alabileceğiniz Renkler__');
			embedTwo.setColor(embedColor);
			embedTwo.setDescription(`╭✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚\n│୨୧︰${colors.color9}・<@&${button.color9.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color10}・<@&${button.color10.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color11}・<@&${button.color11.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color12}・<@&${button.color12.customId}>\n│------------ ♡ ------------\n╰✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚`);
			embedTwo.setImage(embedImage);

			await message.channel.send({ embeds: [embedTwo], components: [buttonRows.butttonRowThree], ephemeral: true });
			await message.channel.send('https://i.hizliresim.com/owtmf5m.gif');

			const embedThree = new MessageEmbed();
			embedThree.setTitle('__25 Levelde Alabileceğiniz Renkler__');
			embedThree.setColor(embedColor);
			embedThree.setDescription(`╭✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚\n│୨୧︰${colors.color13}・<@&${button.color13.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color14}・<@&${button.color14.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color15}・<@&${button.color15.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color16}・<@&${button.color16.customId}>\n│------------ ♡ ------------\n╰✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚`);
			embedThree.setImage(embedImage);

			await message.channel.send({ embeds: [embedThree], components: [buttonRows.butttonRowFour], ephemeral: true });
			await message.channel.send('https://i.hizliresim.com/owtmf5m.gif');

			const embedFour = new MessageEmbed();
			embedFour.setTitle('__35 Levelde Alabileceğiniz Renkler__');
			embedFour.setColor(embedColor);
			embedFour.setDescription(`╭✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚\n│୨୧︰${colors.color17}・<@&${button.color17.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color18}・<@&${button.color18.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color19}・<@&${button.color19.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color20}・<@&${button.color20.customId}>\n│------------ ♡ ------------\n╰✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚`);
			embedFour.setImage(embedImage);

			await message.channel.send({ embeds: [embedFour], components: [buttonRows.butttonRowFive], ephemeral: true });
			await message.channel.send('https://i.hizliresim.com/owtmf5m.gif');

			const embedFive = new MessageEmbed();
			embedFive.setTitle('__45 Levelde Alabileceğiniz Renkler__');
			embedFive.setColor(embedColor);
			embedFive.setDescription(`╭✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚\n│୨୧︰${colors.color21}・<@&${button.color21.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color22}・<@&${button.color22.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color23}・<@&${button.color23.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color24}・<@&${button.color24.customId}>\n│------------ ♡ ------------\n╰✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚`);
			embedFive.setImage(embedImage);

			await message.channel.send({ embeds: [embedFive], components: [buttonRows.butttonRowSix], ephemeral: true });
			await message.channel.send('https://i.hizliresim.com/owtmf5m.gif');

			const embedSix = new MessageEmbed();
			embedSix.setTitle('__50 Levelde Alabileceğiniz Renkler__');
			embedSix.setColor(embedColor);
			embedSix.setDescription(`╭✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚\n│୨୧︰${colors.color25}・<@&${button.color25.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color26}・<@&${button.color26.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color27}・<@&${button.color27.customId}>\n│------------ ♡ ------------\n│୨୧︰${colors.color28}・<@&${button.color28.customId}>\n│------------ ♡ ------------\n╰✦ ⁺ ﹒ ‧ ˚ ₊ ✧ ﹒ ‧ ⁺ . ˚ ✦ ˚ ﹒ ✧ ﹒ ₊ ˚`);
			embedSix.setImage(embedImage);

			await message.channel.send({ embeds: [embedSix], components: [buttonRows.butttonRowSeven], ephemeral: true });
		}
	}
};
