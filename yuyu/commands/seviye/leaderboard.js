/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { default: axios } = require('axios');
const progressbar = require('string-progressbar');


module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'leaderboard',
			memberName: 'leaderboard',
			aliases: ['leaderboards', 'ledaerboard', 'tablo', 'leader', 'board'],
			group: 'seviye',
			description: 'Tüm Sunucunun Level Durumunu Görüntüler.',
		});
	}

	async run(message) {
		// const guild = this.client.guilds.cache.get('842425040409460757');
		const { client } = this;
		function dynamicSort(property) {
			let sortOrder = 1;
			if (property[0] === '-') {
				sortOrder = -1;
				property = property.substr(1);
			}
			return function(a, b) {
				/*
				 * next line works with strings and numbers,
				 * and you may want to customize it to your needs
				 */
				const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
				return result * sortOrder;
			};
		}
		function dynamicSortMultiple() {
			/*
			 * save the arguments object as it will be overwritten
			 * note that arguments object is an array-like object
			 * consisting of the names of the properties to sort by
			 */
			const props = arguments;
			return function(obj1, obj2) {
				let i = 0; let result = 0;
				const numberOfProperties = props.length;
				/* try getting a different result from 0 (equal)
				 * as long as we have extra properties to compare
				 */
				while (result === 0 && i < numberOfProperties) {
					result = dynamicSort(props[i])(obj1, obj2);
					i += 1;
				}
				return result;
			};
		}
		let sayi = 0;
		const levelUpNumber = 56;
		const list = [];


		axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/mesajsayisi.json').then(async (response) => {
			if (response.data == null) {
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/mesajsayisi/${message.member.id}.json`, { sayi: 1, level: 1 });
			}
			else {
				for (const key in response.data) {
					list.push({
						id: key,
						sayi: response.data[key].sayi,
						level: response.data[key].level,

					});
				}

				list.sort(dynamicSortMultiple('-level', '-sayi'));
			}


			// const levelUpCoefficientOne = levelUpNumber + (levelUpNumber * level) + (level * levelUpNumber * 0, 5);
			for (let x = 0; x < list.length; x += 1) {
				try {
					list[x].user = await message.guild.members.cache.get(list[x].id);
					list[x].username = list[x].user.user.username;
					list[x].username = list[x].username.replace('`', ' ');
				}
				catch {
					list[x].username = 'Çıkmış Kullanıcı';
				}


				list[x].levelUpCoefficientOne = levelUpNumber + (levelUpNumber * list[x].level) + (list[x].level * levelUpNumber * 0.5);
				list[x].percentNumber = parseInt((list[x].sayi / list[x].levelUpCoefficientOne) * 100);

				list[x].percentNumber = list[x].percentNumber.toString().split('.');

				list[x].percentNumber = list[x].percentNumber[0];


				list[x].percent = progressbar.filledBar(100, list[x].percentNumber, 30);
				const y = x + 1;
				list[x].Number = y.toString().split('');
				list[x].sira = [];
				for (let i = 0; i < list[x].Number.length; i += 1) {
					switch (list[x].Number[i]) {
					case '0':
						await list[x].sira.push('<a:0_:845316219858452510>');
						break;
					case '1':
						await list[x].sira.push('<a:1_:845316220056240158>');
						break;
					case '2':
						await list[x].sira.push('<a:2_:845316252003598347>');
						break;
					case '3':
						await list[x].sira.push('<a:3_:845316281989464084>');
						break;
					case '4':
						await list[x].sira.push('<a:4_:845316284987605043>');
						break;
					case '5':
						await list[x].sira.push('<a:5_:845316285037281360>');
						break;
					case '6':
						await list[x].sira.push('<a:6_:845316285154852870>');
						break;
					case '7':
						await list[x].sira.push('<a:7_:845316284526362684>');
						break;
					case '8':
						await list[x].sira.push('<a:8_:845316285058646016>');
						break;
					case '9':
						await list[x].sira.push('<a:9_:845316285566681099>');
						break;
					// no default
					}
				}
				list[x].sira = list[x].sira.join('');
			}

			function embed() {
				return new MessageEmbed()
					.setTitle('Lider Tablosu:\n')
					.setColor('#000000')
					.setThumbnail('https://i.hizliresim.com/srxe7cx.gif')
					.setDescription(
						(list[sayi] ? `${list[sayi].sira}. ${list[sayi].username}\n				Level: \`${list[sayi].level}\`\n 			Exp: \`${list[sayi].sayi}/${list[sayi].levelUpCoefficientOne}xp\` \n` : 'tanımlanmadı')
						+ (list[sayi + 1] ? `${list[sayi + 1].sira}. ${list[sayi + 1].username}\n			Level: \`${list[sayi + 1].level}\`\n			Exp: \`${list[sayi + 1].sayi}/${list[sayi + 1].levelUpCoefficientOne}xp\` \n` : '')
						+ (list[sayi + 2] ? `${list[sayi + 2].sira}. ${list[sayi + 2].username}\n			Level: \`${list[sayi + 2].level}\`\n			Exp: \`${list[sayi + 2].sayi}/${list[sayi + 2].levelUpCoefficientOne}xp\` \n` : '')
						+ (list[sayi + 3] ? `${list[sayi + 3].sira}. ${list[sayi + 3].username}\n			Level: \`${list[sayi + 3].level}\`\n			Exp: \`${list[sayi + 3].sayi}/${list[sayi + 3].levelUpCoefficientOne}xp\` \n` : '')
						+ (list[sayi + 4] ? `${list[sayi + 4].sira}. ${list[sayi + 4].username}\n			Level: \`${list[sayi + 4].level}\`\n			Exp: \`${list[sayi + 4].sayi}/${list[sayi + 4].levelUpCoefficientOne}xp\` \n` : '')
						+ (list[sayi + 5] ? `${list[sayi + 5].sira}. ${list[sayi + 5].username}\n			Level: \`${list[sayi + 5].level}\`\n			Exp: \`${list[sayi + 5].sayi}/${list[sayi + 5].levelUpCoefficientOne}xp\` \n` : '')
						+ (list[sayi + 6] ? `${list[sayi + 6].sira}. ${list[sayi + 6].username}\n			Level: \`${list[sayi + 6].level}\`\n			Exp: \`${list[sayi + 6].sayi}/${list[sayi + 6].levelUpCoefficientOne}xp\` \n` : '')
						+ (list[sayi + 7] ? `${list[sayi + 7].sira}. ${list[sayi + 7].username}\n			Level: \`${list[sayi + 7].level}\`\n			Exp: \`${list[sayi + 7].sayi}/${list[sayi + 7].levelUpCoefficientOne}xp\` \n` : '')
						+ (list[sayi + 8] ? `${list[sayi + 8].sira}. ${list[sayi + 8].username}\n			Level: \`${list[sayi + 8].level}\`\n			Exp: \`${list[sayi + 8].sayi}/${list[sayi + 8].levelUpCoefficientOne}xp\` \n` : ''),
					);
			}
			message.channel.send(embed()).then((msg) => {
				msg.react('849652711849721907');
				msg.react('849652778644275263');
				client.setTimeout(() => {
					// eslint-disable-next-line no-unused-vars
					const filterforward = (reaction, user) => reaction.emoji.name === 'Sonraki_Sayfa';

					const collectorforward = msg.createReactionCollector(filterforward, { time: 900000000 });


					// eslint-disable-next-line no-unused-vars
					collectorforward.on('collect', async (reaction, user) => {
						if (sayi + 9 < list.length) {
							sayi += 9;
						}
						if (message.member.id == client.id) {
							return;
						}
						await msg.edit(embed());
					});
				}, Number(1500));
				client.setTimeout(() => {
					// eslint-disable-next-line no-unused-vars
					const filterprevious = (reaction, user) => reaction.emoji.name === 'Onceki_Sayfa';

					const collectorprevious = msg.createReactionCollector(filterprevious, { time: 900000000 });


					// eslint-disable-next-line no-unused-vars
					collectorprevious.on('collect', async (reaction, user) => {
						if (message.member.id == client.id) {
							return;
						}
						sayi -= 9;
						if (sayi < 0) {
							sayi = 0;
						}
						await msg.edit(embed());
					});
				}, Number(1500));
			});
		});
	}
};
