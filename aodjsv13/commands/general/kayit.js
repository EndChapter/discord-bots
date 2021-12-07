/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class KayitCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kayit',
			memberName: 'kayit',
			aliases: ['kayit', 'kayıt', 'kaytı', 'kayti', 'kayır', 'register', 'reg', 'k'],
			group: 'register',
			description: 'Yeni gelen kullanıcıyı kayıt eder.',
			guildOnly: true,
			args: [
				{
					key: 'newUser',
					prompt: 'Kayıt etmek istediğin kullanıcıyı etiketlemezsen hangi kullanıcıyı kayıt etmek istediğini bilemem, kullanıcıyı sonraki mesajda etiketleyebilirsin veya komutu iptal edebilirsin...',
					type: 'string',
				},
			],
		});
	}

	async run(message, { newUser }) {
		// if(message.channel.id == '844374778479640577'){
		if (message.member.roles.cache.has('875498368103755936') || message.member.user.id == '507232669164109824') {
			const user = message.guild.members.cache.find((member) => member.id === newUser);
			if (user == undefined) {
				message.say('Lütfen geçerli bir id girin');
				return;
			}
			if (user.roles.cache.has('875715245014929459')) {
				const list = [];
				let post = false;
				axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/${message.author.id}/kayitsayisi.json`).then(async (response) => {
					if (response.data == null) {
						post = true;
						list.push({ kayitsayisi: 1 });
					}
					else {
						for (const key in response.data) {
							list.push({ id: key, kayitsayisi: response.data[key].kayitsayisi });
							list[0].kayitsayisi += 1;
							// sayi = list[0].data;
						}
					}
					user.roles.add('853691558276497458');
					user.roles.add('853728009189457950');
					user.roles.add('853728069085036614');
					user.roles.add('853728076528615484');
					user.roles.remove('875715245014929459');
					const embed = new MessageEmbed()
						.setColor('#000000')
					// .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
						.setDescription(`<@${user.user.id}>, <@${message.author.id}> tarafından kaydedildi.\n\n<@${message.author.id}> toplamda ${list[0].kayitsayisi} kişi kaydettiniz.`)
						.setTimestamp();
					// .setImage("https://w.wallhaven.cc/full/43/wallhaven-437ww3.jpg")
					message.say(embed);
					await message.guild.members.fetch().then(async (m) => {
						let sayi = [];
						const buyukluk = m.size.toString().split('');
						for (let i = 0; i < buyukluk.length; i += 1) {
							switch (buyukluk[i]) {
							case '0':
								sayi.push('<a:0_:854793177080135741>');
								break;
							case '1':
								sayi.push('<a:1_:854793181542219826>');
								break;
							case '2':
								sayi.push('<a:2_:854793184315441172>');
								break;
							case '3':
								sayi.push('<a:3_:854793183970721823>');
								break;
							case '4':
								sayi.push('<a:4_:854793184387137606>');
								break;
							case '5':
								sayi.push('<a:5_:854793184503922698>');
								break;
							case '6':
								sayi.push('<a:6_:854793184441794560>');
								break;
							case '7':
								sayi.push('<a:7_:854793184008994858>');
								break;
							case '8':
								sayi.push('<a:8_:854793184302071828>');
								break;
							case '9':
								sayi.push('<a:9_:854793184474562571>');
								break;
								// no default
							}
						}
						sayi = sayi.join('');
						const channel = message.guild.channels.cache.get('853694027928174612');
						const embedOne = new MessageEmbed()
							.setTitle(`${message.guild.name} Sunucusuna\nHoş Geldin !`)
							.setThumbnail(user.user.displayAvatarURL())
						// .setAuthor(`${guild.name} Sunucusuna Hoş Geldin !`)
							.setColor('#3A56E0')
							.setDescription(`<#853692073667199066> kısmında senin için kurallarımız var onları okumayı unutma!\n\n <#853693408501301279> ve <#853693437835608144> kısmında sevebileceğin roller olacağını düşünüyoruz, bence bir göz at.\n\nİstersen <#853695551932465162> kısmından kendini tanıtabilirsin.\n\nSeninle şu an tam ${sayi} kişiyiz.`)
							.setImage('https://media1.tenor.com/images/1f032781e3afba8a46f31f89d59d6d88/tenor.gif')
						// .setThumbnail('https://i.hizliresim.com/srxe7cx.gif')
							.setTimestamp();
						channel.send(`<@${user.id}> Aramıza Katıldı! ||<@&855940342892986409>|| Yeni üyemize merhaba deyin.`, { embed: embedOne });
					});
					if (post) {
						await axios.post(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/${message.author.id}/kayitsayisi.json`, { kayitsayisi: list[0].kayitsayisi }).catch((e) => { console.log(e); });
						post = false;
					}
					else {
						await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/${message.author.id}/kayitsayisi/${list[0].id}.json`, { kayitsayisi: list[0].kayitsayisi }).catch((e) => { console.log(e); });
					}
				});
			}
			else {
				message.say('bunu yapmanız için kullanıcının kayıtsız rolüne sahip olması gerekir!!');
			}
		}
		else {
			message.say('Bunu yapmaya yetkin yok!');
		}
		// let userid = newUser.split('').slice(3,21).join('');

		// member.roles.add('842467298044674059');
		// member.roles.add('843884074468900865');
	}
};
