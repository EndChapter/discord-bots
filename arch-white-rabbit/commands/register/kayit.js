/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
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
		if (message.member.roles.cache.has('844372994385117195') || message.member.user.id == '507232669164109824') {
			const user = message.guild.members.cache.find((member) => member.id === newUser);
			if (user == undefined) {
				message.say('Lütfen geçerli bir id girin');
				return;
			}
			if (user.roles.cache.has('843289751935254568')) {
				const list = [];
				let post = false;
				axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.author.id}/kayitsayisi.json`).then(async (response) => {
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
					user.roles.add('842467298044674059');
					user.roles.add('843884074468900865');
					user.roles.add('848880225680359424');
					user.roles.add('848881690083590144');
					user.roles.remove('843289751935254568');
					const embed = new MessageEmbed()
						.setColor('#000000')
					// .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
						.setDescription(`<@${user.user.id}>, <@${message.author.id}> tarafından kaydedildi.\n\n<@${message.author.id}> toplamda ${list[0].kayitsayisi} kişi kaydettiniz.`)
						.setTimestamp()
						.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');
					// .setImage("https://w.wallhaven.cc/full/43/wallhaven-437ww3.jpg")
					message.say(embed);
					await message.guild.members.fetch().then(async (m) => {
						let sayi = [];
						const buyukluk = m.size.toString().split('');
						for (let i = 0; i < buyukluk.length; i += 1) {
							switch (buyukluk[i]) {
							case '0':
								sayi.push('<a:0_:845316219858452510>');
								break;
							case '1':
								sayi.push('<a:1_:845316220056240158>');
								break;
							case '2':
								sayi.push('<a:2_:845316252003598347>');
								break;
							case '3':
								sayi.push('<a:3_:845316281989464084>');
								break;
							case '4':
								sayi.push('<a:4_:845316284987605043>');
								break;
							case '5':
								sayi.push('<a:5_:845316285037281360>');
								break;
							case '6':
								sayi.push('<a:6_:845316285154852870>');
								break;
							case '7':
								sayi.push('<a:7_:845316284526362684>');
								break;
							case '8':
								sayi.push('<a:8_:845316285058646016>');
								break;
							case '9':
								sayi.push('<a:9_:845316285566681099>');
								break;
							// no default
							}
						}
						sayi = sayi.join('');
						const channel = message.guild.channels.cache.get('842771976438808606');
						const embedOne = new MessageEmbed()
							.setTitle('Sunucusuna Hoş Geldin !')
							.setAuthor(message.guild.name)
							.setColor('#000000')
							.setDescription(`Seninle şu an tam ${sayi} kişiyiz.\n\n<#842768294347931668> kısmında senin için kurallarımız var onları okumayı unutma!\n\n <#842771081688776756> ve <#842771110889914368> kısmında sevebileceğin roller olacağını düşünüyoruz, bence bir göz at.`)
							.setImage('https://media1.tenor.com/images/d0a88681a3376cd489a595c33652eaad/tenor.gif')
							.setThumbnail('https://i.hizliresim.com/srxe7cx.gif')
							.setTimestamp();
						channel.send(`<@${user.user.id}> Aramıza Katıldı!`, { embed: embedOne });
					});
					if (post) {
						await axios.post(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.author.id}/kayitsayisi.json`, { kayitsayisi: list[0].kayitsayisi }).catch((e) => { console.log(e); });
						post = false;
					}
					else {
						await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.author.id}/kayitsayisi/${list[0].id}.json`, { kayitsayisi: list[0].kayitsayisi }).catch((e) => { console.log(e); });
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
