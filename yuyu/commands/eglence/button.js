/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = class buttons extends Command {
	constructor(client) {
		super(client, {
			name: 'buttons',
			memberName: 'buttons',
			aliases: ['buton', 'button'],
			group: 'eglence',
			description: 'Sunucuda belirli butonları görüntüler. Sadece yöneticiler kullanabilir.',
		});
	}

	run(message) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			// if(message.channel.id === '842784398709751838'){
			const renk = 'green';
			const button = {
				blurple: new MessageButton()
					.setStyle(renk)
					.setLabel('|  Kırmızı')
					.setID('844566836921368685'),
				gray: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Turuncu')
					.setID('844567028043350096'),
				green: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Limon')
					.setID('844567032661671946'),
				red: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Krem')
					.setID('844567058724683806'),
				url: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Lime')
					.setID('844567047118651432'),
				blurpleOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Mavi')
					.setID('844567036171780126'),
				grayOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Menekşe')
					.setID('844567052991201290'),
				greenOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Mor')
					.setID('844567328955301889'),
				redOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Koyu Mor')
					.setID('844567049900785674'),
				urlOne: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Najavo')
					.setID('844567056086597652'),
				blurpleTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Mandalina')
					.setID('848885428261486592'),
				grayTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Pamuk Şeker')
					.setID('848885470545182720'),
				greenTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Melrose')
					.setID('848885853342138378'),
				redTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Bataklık Yeşili')
					.setID('848885461774106646'),
				urlTwo: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Mongoose')
					.setID('848885850099810365'),
				blurpleThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Yeşil')
					.setID('849816091499954276'),
				grayThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Kızıl Kahverengi')
					.setID('848885451615633409'),
				greenThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Turkuaz')
					.setID('849816082918146048'),
				redThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Gece Moru')
					.setID('849816079857483806'),
				urlThree: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Stratos')
					.setID('849816085494235207'),
				blurpleFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Siyah')
					.setID('848885843358646302'),
				grayFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Beyaz')
					.setID('848885849017024522'),
				greenFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Mercan Kırmızısı')
					.setID('849816088514396201'),
				redFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Elektrik Mavisi')
					.setID('848885479566213172'),
				urlFour: new MessageButton()
					.setStyle(renk)
					.setLabel('  | Sarı')
					.setID('848885834232234024'),
			};
			button.blurple.emoji = 		{ name: 'color1', 	id: '849844084415397909' };
			button.gray.emoji = 		{ name: 'color2', 	id: '849846281711124481' };
			button.green.emoji = 		{ name: 'color3', 	id: '849846281946136626' };
			button.red.emoji = 			{ name: 'color4', 	id: '849846281941024828' };
			button.url.emoji = 			{ name: 'color5', 	id: '849846281873653760' };
			button.blurpleOne.emoji = 	{ name: 'color6', 	id: '849857777126866985' };
			button.grayOne.emoji = 		{ name: 'color7', 	id: '849857777143644202' };
			button.greenOne.emoji = 	{ name: 'color8', 	id: '849857777212063796' };
			button.redOne.emoji = 		{ name: 'color9', 	id: '849857777442750495' };
			button.urlOne.emoji = 		{ name: 'color10', 	id: '849857777459265538' };
			button.blurpleTwo.emoji = 	{ name: 'color11', 	id: '849861492291141652' };
			button.grayTwo.emoji = 		{ name: 'color12', 	id: '849862292417151006' };
			button.greenTwo.emoji = 	{ name: 'color13', 	id: '849861443602874369' };
			button.redTwo.emoji = 		{ name: 'color14', 	id: '849861443616112679' };
			button.urlTwo.emoji = 		{ name: 'color15', 	id: '849861443682697256' };
			button.blurpleThree.emoji = { name: 'color16', 	id: '850507751435010078' };
			button.grayThree.emoji = 	{ name: 'color17', 	id: '850507763813580800' };
			button.greenThree.emoji = 	{ name: 'color18', 	id: '850507774235377665' };
			button.redThree.emoji = 	{ name: 'color19', 	id: '850507783546994699' };
			button.urlThree.emoji = 	{ name: 'color20', 	id: '850507792670654484' };
			button.blurpleFour.emoji = 	{ name: 'color21', 	id: '850507802778009610' };
			button.grayFour.emoji = 	{ name: 'color22', 	id: '850507811733110824' };
			button.greenFour.emoji = 	{ name: 'color23', 	id: '850507837905043497' };
			button.redFour.emoji = 		{ name: 'color24', 	id: '850507848018559058' };
			button.urlFour.emoji = 		{ name: 'color25', 	id: '850507860999667712' };
			const colors = {
				color1: '<:color1:849844084415397909>',
				color2: '<:color2:849846281711124481>',
				color3: '<:color3:849846281946136626>',
				color4: '<:color4:849846281941024828>',
				color5: '<:color5:849846281873653760>',
				color6: '<:color6:849857777126866985>',
				color7: '<:color7:849857777143644202>',
				color8: '<:color8:849857777212063796>',
				color9: '<:color9:849857777442750495>',
				color10: '<:color10:849857777459265538>',
				color11: '<:color11:849861492291141652>',
				color12: '<:color12:849862292417151006>',
				color13: '<:color13:849861443602874369>',
				color14: '<:color14:849861443616112679>',
				color15: '<:color15:849861443682697256>',
				color16: '<:color16:850507751435010078>',
				color17: '<:color17:850507763813580800>',
				color18: '<:color18:850507774235377665>',
				color19: '<:color19:850507783546994699>',
				color20: '<:color20:850507792670654484>',
				color21: '<:color21:850507802778009610>',
				color22: '<:color22:850507811733110824>',
				color23: '<:color23:850507837905043497>',
				color24: '<:color24:850507848018559058>',
				color25: '<:color25:850507860999667712>',
			};
			const buttonRows = {
				butttonRowOne: new MessageActionRow().addComponent(button.blurple).addComponent(button.gray).addComponent(button.green)
					.addComponent(button.red)
					.addComponent(button.url),
				butttonRowTwo: new MessageActionRow().addComponent(button.blurpleOne).addComponent(button.grayOne).addComponent(button.greenOne)
					.addComponent(button.redOne)
					.addComponent(button.urlOne),
				butttonRowThree: new MessageActionRow().addComponent(button.blurpleTwo).addComponent(button.grayTwo).addComponent(button.greenTwo)
					.addComponent(button.redTwo)
					.addComponent(button.urlTwo),
				butttonRowFour: new MessageActionRow().addComponent(button.blurpleThree).addComponent(button.grayThree).addComponent(button.greenThree)
					.addComponent(button.redThree)
					.addComponent(button.urlThree),
				butttonRowFive: new MessageActionRow().addComponent(button.blurpleFour).addComponent(button.grayFour).addComponent(button.greenFour)
					.addComponent(button.redFour)
					.addComponent(button.urlFour),
			};
			const embed = new MessageEmbed();
			embed.setTitle('__5 Levelde Alabileceğiniz Renkler__');
			embed.setColor('#000000');
			embed.setDescription(`\n\n${colors.color1} | <@&844566836921368685>\n\n${colors.color2} | <@&844567028043350096>\n\n${colors.color3} | <@&844567032661671946>\n\n${colors.color4} | <@&844567058724683806>\n\n${colors.color5} | <@&844567047118651432> `);
			embed.setImage('https://i.hizliresim.com/t7upjqj.gif');
			embed.setFooter(' ');

			embed.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed, component: buttonRows.butttonRowOne });

			const embedOne = new MessageEmbed();
			embedOne.setTitle('__15 Levelde Alabileceğiniz Renkler__');
			embedOne.setColor('#000000');
			embedOne.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedOne.setDescription(`\n\n${colors.color6} | <@&844567036171780126>\n\n${colors.color7} | <@&844567052991201290>\n\n${colors.color8} | <@&844567328955301889>\n\n${colors.color9} | <@&844567049900785674>\n\n${colors.color10} | <@&844567056086597652> `);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedOne.setImage('https://i.hizliresim.com/t7upjqj.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed: embedOne, components: buttonRows.butttonRowTwo });

			const embedTwo = new MessageEmbed();
			embedTwo.setTitle('__25 Levelde Alabileceğiniz Renkler__');
			embedTwo.setColor('#000000');
			embedTwo.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedTwo.setDescription(`\n\n${colors.color11} | <@&848885428261486592>\n\n${colors.color12} | <@&848885470545182720>\n\n${colors.color13} | <@&848885853342138378>\n\n${colors.color14} | <@&848885461774106646>\n\n${colors.color15} | <@&848885850099810365> `);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedTwo.setImage('https://i.hizliresim.com/t7upjqj.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed: embedTwo, component: buttonRows.butttonRowThree });

			const embedThree = new MessageEmbed();
			embedThree.setTitle('__35 Levelde Alabileceğiniz Renkler__');
			embedThree.setColor('#000000');
			embedThree.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedThree.setDescription(`\n\n${colors.color16} | <@&849816091499954276>\n\n${colors.color17} | <@&848885451615633409>\n\n${colors.color18} | <@&849816082918146048>\n\n${colors.color19} | <@&849816079857483806>\n\n${colors.color20} | <@&849816085494235207> `);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedThree.setImage('https://i.hizliresim.com/t7upjqj.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed: embedThree, component: buttonRows.butttonRowFour });

			const embedFour = new MessageEmbed();
			embedFour.setTitle('__45 Levelde Alabileceğiniz Renkler__');
			embedFour.setColor('#000000');
			embedFour.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
			embedFour.setDescription(`\n\n${colors.color21} | <@&848885843358646302>\n\n${colors.color22} | <@&848885849017024522>\n\n${colors.color23} | <@&849816088514396201>\n\n${colors.color24} | <@&848885479566213172>\n\n${colors.color25} | <@&848885834232234024> `);
			// EmbedOne.setFooter('Rolleri Butonlara Tıklayarak Alamıyorsanız veya Butonlar Gözükmüyorsa Lütfen Discordu Güncelleyin...')
			embedFour.setImage('https://i.hizliresim.com/t7upjqj.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed: embedFour, component: buttonRows.butttonRowFive });
			// Using Collection.filter() to separate the online members from the offline members.
			// }
		}
	}
};
