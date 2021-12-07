/* eslint-disable strict */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class KisiselCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kisisel',
			memberName: 'kisisel',
			aliases: ['kişisel'],
			group: 'general',
			description: 'Sunucuda belirli butonları görüntüler. Sadece yöneticiler kullanabilir.',
		});
	}

	async run(message) {
		if (message.member.permissions.has('ADMINISTRATOR') || message.member.user.id == '507232669164109824') {
		// if( message.channel.id === '842784398709751838' ){
			const renk = 'DANGER';
			const embedColor = '#CD0000';

			// 'https://i.hizliresim.com/7x69ld4.gif'
			const embedGif = 'https://biblionyan.files.wordpress.com/2019/10/original.gif';
			const button = {
				blurple: new MessageButton()
					.setStyle(renk)
					.setLabel('  |  Kız')
					.setCustomId('887825555360219156')
					.setEmoji('❤️'),
				gray: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Erkek')
					.setCustomId('887825563576848396')
					.setEmoji('💙'),
				green: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Nonbinary')
					.setCustomId('887825569817972736')
					.setEmoji('🤍'),
				red: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koç')
					.setCustomId('887825975516217364')
					.setEmoji('♈'),
				url: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Boğa')
					.setCustomId('887825983573463080')
					.setEmoji('♉'),
				blurpleOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | İkizler')
					.setCustomId('887825991609765909')
					.setEmoji('♊'),
				grayOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yengeç')
					.setCustomId('887826024962863174')
					.setEmoji('♋'),
				greenOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Aslan')
					.setCustomId('887826020747603998')
					.setEmoji('♌'),
				redOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Başak')
					.setCustomId('887826032776839178')
					.setEmoji('♍'),
				urlOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Terazi')
					.setCustomId('887826040586633226')
					.setEmoji('♎'),
				blurpleTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Akrep')
					.setCustomId('887826045842104330')
					.setEmoji('♏'),
				grayTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yay')
					.setCustomId('887826054209757214')
					.setEmoji('♐'),
				greenTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Oğlak')
					.setCustomId('887826050359377920')
					.setEmoji('♑'),
				redTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Kova')
					.setCustomId('887825998912028774')
					.setEmoji('♒'),
				urlTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Balık')
					.setCustomId('887826007300636712')
					.setEmoji('♓'),
				blurpleThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | League of Legends')
					.setCustomId('887828230067851304')
					.setEmoji('850112717854736409'),
				grayThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Among Us')
					.setCustomId('887828237919596584')
					.setEmoji('850113010777456670'),
				greenThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Genshin Impact')
					.setCustomId('887828260535296091')
					.setEmoji('850114731704057886'),
				redThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Minecraft')
					.setCustomId('887828246048178246')
					.setEmoji('850117654450667581'),
				urlThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Valorant')
					.setCustomId('887828253056860161')
					.setEmoji('850118463343165460'),
				blurpleFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Osu')
					.setCustomId('887828265455210508')
					.setEmoji('888205306629345341'),
				grayFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Sevgilin varsa')
					.setCustomId('887830763851116565')
					.setEmoji('❤️‍🔥'),
				greenFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Hoşlandığın varsa')
					.setCustomId('887831578439471124')
					.setEmoji('💗'),
				redFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Sevgilin yoksa')
					.setCustomId('887830772331991071')
					.setEmoji('💘'),
				urlFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Sevgili yapmıyorsan')
					.setCustomId('887830776790548530')
					.setEmoji('🖤'),
				blurpleFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | 13-15 Yaş')
					.setCustomId('887833135239278642')
					.setEmoji('🥤'),
				grayFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | 16-18 Yaş')
					.setCustomId('887833201110822932')
					.setEmoji('🍋'),
				greenFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | 18+ Yaş')
					.setCustomId('887833293435846666')
					.setEmoji('🍊'),
				redFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yaşımı Belirtmek İstemiyorum')
					.setCustomId('887833320287784982')
					.setEmoji('881658582855196733'),
				urlFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Uyumak')
					.setCustomId('887834314211999774')
					.setEmoji('888203796990296065'),
				blurpleSix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Kitap Okumak')
					.setCustomId('887834374664507443')
					.setEmoji('📖'),
				graySix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Spor Yapmak')
					.setCustomId('888201729705930804')
					.setEmoji('882304163009142814'),
				greenSix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yeni Birileri ile Tanışmak')
					.setCustomId('887834409145888858')
					.setEmoji('888204539226886145'),
				redSix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yemek Yapmak')
					.setCustomId('887834483452166204')
					.setEmoji('🍳'),
				urlSix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Müzik Dinlemek')
					.setCustomId('887834540284977163')
					.setEmoji('852945174170435654'),
				blurpleSeven: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Oyun Oynamak')
					.setCustomId('887834693096058911')
					.setEmoji('852947270844678144'),
				graySeven: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Film Dizi İzlemek')
					.setCustomId('887834574808309883')
					.setEmoji('📺'),

			};

			const colors = {
				color1: '<:lol:850112717854736409>',
				color2: '<:amongus:850113010777456670>',
				color3: '<:genshin:850114731704057886>',
				color4: '<:minecraft:850117654450667581>',
				color5: '<:valorant:850118463343165460>',
				color6: '<:osu:888205306629345341>',
				color7: '<:sleep:888203796990296065>',
				color9: '<a:aoshi_nezukorow:882304163009142814>',
				color10: '<a:aoshi_mavikalp:888204539226886145>',
				color12: '<a:muzik:852945174170435654>',
				color13: '<:game:852947270844678144>',
				color14: '<a:siyah:881658582855196733>',
			};
			const buttonRows = {
				butttonRowOne: new MessageActionRow().addComponents(button.blurple, button.gray, button.green),
				butttonRowTwo: new MessageActionRow().addComponents(button.red, button.url, button.blurpleOne, button.grayOne),
				butttonRowThree: new MessageActionRow().addComponents(button.greenOne, button.redOne, button.urlOne, button.blurpleTwo),
				butttonRowFour: new MessageActionRow().addComponents(button.grayTwo, button.greenTwo, button.redTwo, button.urlTwo),
				butttonRowFive: new MessageActionRow().addComponents(button.blurpleThree, button.grayThree, button.greenThree),
				butttonRowSix: new MessageActionRow().addComponents(button.redThree, button.urlThree, button.blurpleFour),
				butttonRowSeven: new MessageActionRow().addComponents(button.grayFour, button.greenFour, button.redFour, button.urlFour),
				butttonRowEight: new MessageActionRow().addComponents(button.redFive, button.greenFive, button.grayFive, button.blurpleFive),
				buttonRowNine: new MessageActionRow().addComponents(button.urlFive, button.blurpleSix, button.graySix, button.greenSix),
				buttonRowTen: new MessageActionRow().addComponents(button.redSix, button.urlSix, button.blurpleSeven, button.graySeven),
			};
			const embed = new MessageEmbed();
			embed.setAuthor(`${message.guild.name} Kişisel Bilgi Seçimi`, '', '');
			embed.setTitle('__Cinsiyet Rolleri__');
			embed.setColor(embedColor);
			embed.setDescription('\n\n**Kız** Üyesiyseniz | ❤️\n\n**Erkek** Üyesiyseniz | 💙\n\n Nonbinary iseniz | 🤍');
			embed.setImage(embedGif);
			embed.setFooter(' ');

			// Embed.setTimestamp();
			await message.channel.send({ embeds: [embed], ephemeral: true, components: [buttonRows.butttonRowOne] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');

			const embedOne = new MessageEmbed();

			embedOne.setTitle('__Burç Rolleri #1__');
			embedOne.setColor(embedColor);
			embedOne.setDescription('\n\n♈ | Koç Burcu\n\n♉ | Boğa Burcu\n\n♊ | İkizler Burcu\n\n♋ | Yengeç Burcu');
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedOne.setImage(embedGif);

			// Embed.setTimestamp();
			await message.channel.send({ embeds: [embedOne], ephemeral: true, components: [buttonRows.butttonRowTwo] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');

			const embedTwo = new MessageEmbed();

			embedTwo.setTitle('__Burç Rolleri #2__');
			embedTwo.setColor(embedColor);
			embedTwo.setDescription('\n\n♌ | Aslan Burcu\n\n♍ | Başak Burcu\n\n♎ | Terazi Burcu\n\n♏ | Akrep Burcu');
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedTwo.setImage(embedGif);

			// Embed.setTimestamp();
			await message.channel.send({ embeds: [embedTwo], ephemeral: true, components: [buttonRows.butttonRowThree] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');

			const embedThree = new MessageEmbed();

			embedThree.setTitle('__Burç Rolleri #3__');
			embedThree.setColor(embedColor);
			embedThree.setDescription('\n\n♐ | Yay Burcu\n\n♑ | Oğlak Burcu\n\n♒ | Kova Burcu\n\n♓ | Balık Burcu');
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedThree.setImage(embedGif);

			// Embed.setTimestamp();
			await message.channel.send({ embeds: [embedThree], ephemeral: true, components: [buttonRows.butttonRowFour] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');

			const embedFour = new MessageEmbed();

			embedFour.setTitle('__Oyun Rolleri #1__');
			embedFour.setColor(embedColor);
			embedFour.setDescription(`\n\n${colors.color1} | League of Legends\n\n${colors.color2} | Among Us\n\n${colors.color3} | Genshin Impact`);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedFour.setImage(embedGif);

			// Embed.setTimestamp();
			await message.channel.send({ embeds: [embedFour], ephemeral: true, components: [buttonRows.butttonRowFive] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');
			// Using Collection.filter() to separate the online members from the offline members.
			// }

			const embedFive = new MessageEmbed();
			embedFive.setTitle('__Oyun Rolleri #2__');
			embedFive.setColor(embedColor);
			embedFive.setDescription(`\n\n${colors.color4} | Minecraft\n\n${colors.color5} | Valorant\n\n${colors.color6} | Osu `);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedFive.setImage(embedGif);

			await message.channel.send({ embeds: [embedFive], ephemeral: true, components: [buttonRows.butttonRowSix] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');

			const embedSix = new MessageEmbed();
			embedSix.setTitle('__İlişki Rolleri__');
			embedSix.setColor(embedColor);
			embedSix.setDescription('\n\n❤️‍🔥 | Sevgilin varsa\n\n💗 | Hoşlandığın varsa\n\n💘 | Sevgilin yoksa\n\n🖤 | Sevgili yapmıyorsan');
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedSix.setImage(embedGif);

			await message.channel.send({ embeds: [embedSix], ephemeral: true, components: [buttonRows.butttonRowSeven] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');

			const embedSeven = new MessageEmbed();
			embedSeven.setTitle('__Yaş Rolleri__');
			embedSeven.setColor(embedColor);
			embedSeven.setDescription(`${colors.color14} | Yaşınızı belirtmek istemiyorsanız\n\n🍊 | Yaşınız 18'den büyükse\n\n🍋 | Yaşınız 16-18 arasıysa\n\n🥤 |  Yaşınız 13-15 arasıysa`);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedSeven.setImage(embedGif);

			await message.channel.send({ embeds: [embedSeven], ephemeral: true, components: [buttonRows.butttonRowEight] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');

			const embedEight = new MessageEmbed();
			embedEight.setTitle('__Hobi Rolleri__');
			embedEight.setColor(embedColor);
			embedEight.setDescription(`${colors.color7} | Uyumak\n\n📖 | Kitap Okumak\n\n${colors.color9} | Spor Yapmak\n\n${colors.color10} |  Yeni Birileri İle Tanışmak\n\n🧑‍🍳 | Yemek Yapmak\n\n${colors.color12} | Müzik Dinlemek\n\n${colors.color13} | Oyun Oynamak\n\n📺 | Film Dizi İzlemek`);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedEight.setImage(embedGif);

			await message.channel.send({ embeds: [embedEight], ephemeral: true, components: [buttonRows.buttonRowNine, buttonRows.buttonRowTen] });
			await message.channel.send('https://i.hizliresim.com/czk2sit.gif');
		}
	}
};
