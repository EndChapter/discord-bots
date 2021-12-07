/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = class kisisel extends Command {
	constructor(client) {
		super(client, {
			name: 'kisisel',
			memberName: 'kisisel',
			aliases: ['kişisel'],
			group: 'eglence',
			description: 'Sunucuda belirli butonları görüntüler. Sadece yöneticiler kullanabilir.',
		});
	}

	run(message) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
		// if( message.channel.id === '842784398709751838' ){
			const renk = 'blurple';
			const button = {
				blurple: new MessageButton()
					.setStyle(renk)
					.setLabel('  |  Kız')
					.setID('848880380287254569')
					.setEmoji('❤️'),
				gray: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Erkek')
					.setID('848880376118378517')
					.setEmoji('💙'),
				green: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Nonbinary')
					.setID('848883381139537922')
					.setEmoji('🤍'),
				red: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koç')
					.setID('850097869373440021')
					.setEmoji('♈'),
				url: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Boğa')
					.setID('850097977720569877')
					.setEmoji('♉'),
				blurpleOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | İkizler')
					.setID('850098020371791933')
					.setEmoji('♊'),
				grayOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yengeç')
					.setID('850098122784112660')
					.setEmoji('♋'),
				greenOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Aslan')
					.setID('850098170335723600')
					.setEmoji('♌'),
				redOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Başak')
					.setID('850098211023618098')
					.setEmoji('♍'),
				urlOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Terazi')
					.setID('850098253847330846')
					.setEmoji('♎'),
				blurpleTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Akrep')
					.setID('850098300115484702')
					.setEmoji('♏'),
				grayTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yay')
					.setID('850098341269995530')
					.setEmoji('♐'),
				greenTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Oğlak')
					.setID('850098389226881046')
					.setEmoji('♑'),
				redTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Kova')
					.setID('850098615716413508')
					.setEmoji('♒'),
				urlTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Balık')
					.setID('850098653019373658')
					.setEmoji('♓'),
				blurpleThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | League of Legends')
					.setID('848881879528505394')
					.setEmoji('850112717854736409'),
				grayThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Among Us')
					.setID('848881951070093322')
					.setEmoji('850113010777456670'),
				greenThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Genshin Impact')
					.setID('848882026664296458')
					.setEmoji('850114731704057886'),
				redThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Minecraft')
					.setID('848882081681375262')
					.setEmoji('850117654450667581'),
				urlThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Valorant')
					.setID('848882222223851530')
					.setEmoji('850118463343165460'),
				blurpleFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Counter Strike: Global Offensive')
					.setID('848882288187146250')
					.setEmoji('850118756226170900'),
				grayFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Sevgilin varsa')
					.setID('850185570256683018')
					.setEmoji('❤️'),
				greenFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Hoşlandığın varsa')
					.setID('850185493006385192')
					.setEmoji('💗'),
				redFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Sevgilin yoksa')
					.setID('850185090457796618')
					.setEmoji('💔'),
				urlFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Sevgili yapmıyorsan')
					.setID('850185003299504138')
					.setEmoji('🖤'),
				blurpleFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | 13-14 Yaş')
					.setID('850187481521586197')
					.setEmoji('🎂'),
				grayFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | 15-16 Yaş')
					.setID('850187571463323649')
					.setEmoji('🥤'),
				greenFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | 17-18 Yaş')
					.setID('850187621090328596')
					.setEmoji('🍋'),
				redFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | 18+ Yaş')
					.setID('850187679738888213')
					.setEmoji('🍊'),
				urlFive: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Uyumak')
					.setID('852179483821998110')
					.setEmoji('842889801865625600', true),
				blurpleSix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Kitap Okumak')
					.setID('852179474320982036')
					.setEmoji('📖'),
				graySix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Spor Yapmak')
					.setID('852179453849108540')
					.setEmoji('842889775325380638', true),
				greenSix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yeni Birileri ile Tanışmak')
					.setID('852180422891667467')
					.setEmoji('848222165026603008'),
				redSix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yemek Yapmak')
					.setID('852180417036812318')
					.setEmoji('🍳'),
				urlSix: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Müzik Dinlemek')
					.setID('852180420187783219')
					.setEmoji('852945174170435654', true),
				blurpleSeven: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Oyun Oynamak')
					.setID('852179480562106378')
					.setEmoji('852947270844678144'),
				graySeven: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Film Dizi İzlemek')
					.setID('852179477181235200')
					.setEmoji('📺'),

			};

			const colors = {
				color1: '<:lol:850112717854736409>',
				color2: '<:amongus:850113010777456670>',
				color3: '<:genshin:850114731704057886>',
				color4: '<:minecraft:850117654450667581>',
				color5: '<:valorant:850118463343165460>',
				color6: '<:csgo:850118756226170900>',
				color7: '<a:sleep:842889801865625600>',
				color9: '<a:run:842889775325380638>',
				color10: '<:makasaldim:848222165026603008>',
				color12: '<a:muzik:852945174170435654>',
				color13: '<:game:852947270844678144>',
			};
			const buttonRows = {
				butttonRowOne: new MessageActionRow().addComponent(button.blurple).addComponent(button.gray).addComponent(button.green),
				butttonRowTwo: new MessageActionRow().addComponent(button.red).addComponent(button.url).addComponent(button.blurpleOne)
					.addComponent(button.grayOne),
				butttonRowThree: new MessageActionRow().addComponent(button.greenOne).addComponent(button.redOne).addComponent(button.urlOne)
					.addComponent(button.blurpleTwo),
				butttonRowFour: new MessageActionRow().addComponent(button.grayTwo).addComponent(button.greenTwo).addComponent(button.redTwo)
					.addComponent(button.urlTwo),
				butttonRowFive: new MessageActionRow().addComponent(button.blurpleThree).addComponent(button.grayThree).addComponent(button.greenThree),
				butttonRowSix: new MessageActionRow().addComponent(button.redThree).addComponent(button.urlThree).addComponent(button.blurpleFour),
				butttonRowSeven: new MessageActionRow().addComponent(button.grayFour).addComponent(button.greenFour).addComponent(button.redFour)
					.addComponent(button.urlFour),
				butttonRowEight: new MessageActionRow().addComponent(button.blurpleFive).addComponent(button.grayFive).addComponent(button.greenFive)
					.addComponent(button.redFive),
				buttonRowNine: new MessageActionRow().addComponent(button.urlFive).addComponent(button.blurpleSix).addComponent(button.graySix)
					.addComponent(button.greenSix),
				buttonRowTen: new MessageActionRow().addComponent(button.redSix).addComponent(button.urlSix).addComponent(button.blurpleSeven)
					.addComponent(button.graySeven),
			};
			const embed = new MessageEmbed();
			embed.setAuthor('WhiteRabbit Kişisel Bilgi Seçimi', '', '');
			embed.setTitle('__Cinsiyet Rolleri__');
			embed.setColor('#000000');
			embed.setDescription('\n\n**Kız** Üyesiyseniz | ❤️\n\n**Erkek** Üyesiyseniz | 💙\n\n Belirtmek İstemiyorsanız | 🤍');
			embed.setImage('https://i.hizliresim.com/7x69ld4.gif');
			embed.setFooter(' ');
			embed.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed, component: buttonRows.butttonRowOne });

			const embedOne = new MessageEmbed();

			embedOne.setTitle('__Burç Rolleri #1__');
			embedOne.setColor('#000000');
			embedOne.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedOne.setDescription('\n\n♈ | Koç Burcu\n\n♉ | Boğa Burcu\n\n♊ | İkizler Burcu\n\n♋ | Yengeç Burcu');
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedOne.setImage('https://i.hizliresim.com/7x69ld4.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed: embedOne, components: buttonRows.butttonRowTwo });

			const embedTwo = new MessageEmbed();

			embedTwo.setTitle('__Burç Rolleri #2__');
			embedTwo.setColor('#000000');
			embedTwo.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedTwo.setDescription('\n\n♌ | Aslan Burcu\n\n♍ | Başak Burcu\n\n♎ | Terazi Burcu\n\n♏ | Akrep Burcu');
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedTwo.setImage('https://i.hizliresim.com/7x69ld4.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed: embedTwo, component: buttonRows.butttonRowThree });

			const embedThree = new MessageEmbed();

			embedThree.setTitle('__Burç Rolleri #3__');
			embedThree.setColor('#000000');
			embedThree.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedThree.setDescription('\n\n♐ | Yay Burcu\n\n♑ | Oğlak Burcu\n\n♒ | Kova Burcu\n\n♓ | Balık Burcu');
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedThree.setImage('https://i.hizliresim.com/7x69ld4.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed: embedThree, component: buttonRows.butttonRowFour });

			const embedFour = new MessageEmbed();

			embedFour.setTitle('__Oyun Rolleri #1__');
			embedFour.setColor('#000000');
			embedFour.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedFour.setDescription(`\n\n${colors.color1} | League of Legends\n\n${colors.color2} | Among Us\n\n${colors.color3} | Genshin Impact`);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedFour.setImage('https://i.hizliresim.com/7x69ld4.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed: embedFour, component: buttonRows.butttonRowFive });
			// Using Collection.filter() to separate the online members from the offline members.
			// }

			const embedFive = new MessageEmbed();
			embedFive.setTitle('__Oyun Rolleri #2__');
			embedFive.setColor('#000000');
			embedFive.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedFive.setDescription(`\n\n${colors.color4} | Minecraft\n\n${colors.color5} | Valorant\n\n${colors.color6} | Counter Strike Global Offensive `);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedFive.setImage('https://i.hizliresim.com/7x69ld4.gif');

			message.channel.send({ embed: embedFive, component: buttonRows.butttonRowSix });

			const embedSix = new MessageEmbed();
			embedSix.setTitle('__İlişki Rolleri__');
			embedSix.setColor('#000000');
			embedSix.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedSix.setDescription('\n\n❤️ | Sevgilin varsa\n\n💗 | Hoşlandığın varsa\n\n💔 | Sevgilin yoksa\n\n🖤 | Sevgili yapmıyorsan');
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedSix.setImage('https://i.hizliresim.com/7x69ld4.gif');

			message.channel.send({ embed: embedSix, component: buttonRows.butttonRowSeven });

			const embedSeven = new MessageEmbed();
			embedSeven.setTitle('__Yaş Rolleri__');
			embedSeven.setColor('#000000');
			embedSeven.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedSeven.setDescription('🍊 | Yaşınız 18\'den büyükse\n\n🍋 | Yaşınız 17-18 arasıysa\n\n🥤 | Yaşınız 15-16 arasıysa\n\n🎂 |  Yaşınız 13-14 arasıysa');
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedSeven.setImage('https://i.hizliresim.com/7x69ld4.gif');

			message.channel.send({ embed: embedSeven, component: buttonRows.butttonRowEight });

			const embedEight = new MessageEmbed();
			embedEight.setTitle('__Hobi Rolleri__');
			embedEight.setColor('#000000');
			embedEight.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedEight.setDescription(`${colors.color7} | Uyumak\n\n📖 | Kitap Okumak\n\n${colors.color9} | Spor Yapmak\n\n${colors.color10} |  Yeni Birileri İle Tanışmak\n\n🧑‍🍳 | Yemek Yapmak\n\n${colors.color12} | Müzik Dinlemek\n\n${colors.color13} | Oyun Oynamak\n\n📺 | Film Dizi İzlemek`);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedEight.setImage('https://i.hizliresim.com/7x69ld4.gif');

			message.channel.send({ embed: embedEight, components: [buttonRows.buttonRowNine, buttonRows.buttonRowTen] });
		}
	}
};
