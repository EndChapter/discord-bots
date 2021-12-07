/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
const { Command } = require('discord.js-commando');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = class sansmesaji extends Command {
	constructor(client) {
		super(client, {
			name: 'sansmesaji',
			aliases: ['şansmesajı'],
			group: 'general',
			memberName: 'şans mesajı',
			description: 'Şans mesajı özelliğini yönetir(Aç/açık, Kapat/kapalı, Ekle, Çıkar, Liste, Sayı, #kanal)',
			args: [
				{
					key: 'text',
					prompt: 'şans mesajı özelliği ile ne yapmak istersin?',
					type: 'string',
					default: '',
				},
			],
		});
	}

	run(message, { text }) {
		// Turkish cases may cause some problems so i
		let sayi = 0;
		const { client } = this;
		if (message.guild.ownerID == message.member.user.id || message.member.user.id == '853675153333157910' || message.member.user.id == '507232669164109824') {
			axios.get(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sansmesaji.json`).then((response) => {
				function embed() {
					return new MessageEmbed()
						.setTitle('Şans mesajı cümle listesi:\n')
						.setColor('#FF73D3')
						.setAuthor(client.user.username, client.user.displayAvatarURL())
						.setDescription(
							(global.guildData[message.guild.id].sansmesaji.liste[sayi] ? `${sayi + 1}. ${global.guildData[message.guild.id].sansmesaji.liste[sayi]}.\n` : 'tanımlanmadı')
							+ (global.guildData[message.guild.id].sansmesaji.liste[sayi + 1] ? `${sayi + 2}. ${global.guildData[message.guild.id].sansmesaji.liste[sayi + 1]}.\n` : '')
							+ (global.guildData[message.guild.id].sansmesaji.liste[sayi + 2] ? `${sayi + 3}. ${global.guildData[message.guild.id].sansmesaji.liste[sayi + 2]}.\n` : '')
							+ (global.guildData[message.guild.id].sansmesaji.liste[sayi + 3] ? `${sayi + 4}. ${global.guildData[message.guild.id].sansmesaji.liste[sayi + 3]}.\n` : '')
							+ (global.guildData[message.guild.id].sansmesaji.liste[sayi + 4] ? `${sayi + 5}. ${global.guildData[message.guild.id].sansmesaji.liste[sayi + 4]}.\n` : '')
							+ (global.guildData[message.guild.id].sansmesaji.liste[sayi + 5] ? `${sayi + 6}. ${global.guildData[message.guild.id].sansmesaji.liste[sayi + 5]}.\n` : '')
							+ (global.guildData[message.guild.id].sansmesaji.liste[sayi + 6] ? `${sayi + 7}. ${global.guildData[message.guild.id].sansmesaji.liste[sayi + 6]}.\n` : '')
							+ (global.guildData[message.guild.id].sansmesaji.liste[sayi + 7] ? `${sayi + 8}. ${global.guildData[message.guild.id].sansmesaji.liste[sayi + 7]}.\n` : '')
							+ (global.guildData[message.guild.id].sansmesaji.liste[sayi + 8] ? `${sayi + 9}. ${global.guildData[message.guild.id].sansmesaji.liste[sayi + 8]}.\n` : ''),
						);
				}
				if (text.toLowerCase() == 'aç' || text.toUpperCase() == 'AÇ' || text.toLowerCase() == 'açık' || text.toUpperCase() == 'AÇIK') {
					if (response.data.durum == false) {
						if (global.guildData[message.guild.id].sansmesaji.liste.length > 0 && global.guildData[message.guild.id].sansmesaji.channelID != '') {
							axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sansmesaji.json`, { durum: true }).then(() => {
								global.guildData[message.guild.id].sansmesaji.durum = true;
								message.channel.send('Şans mesajı özelliği başarı ile açıldı!');
							});
						}
						else {
							message.channel.send('Bu özelliğin açılabilmesi için kanal(`y!sansmesaji #kanal`) ve mesaj(`y!sansmesaji ekle <mesajicerigi>`) belirtilmelidir!');
						}
					}
					else {
						message.channel.send('Şans mesajı özelliği zaten açık!');
					}
				}
				else if (text.toLowerCase() == 'kapat' || text.toLowerCase() == 'kapalı' || text.toUpperCase() == 'KAPALI') {
					if (response.data.durum == true) {
						axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sansmesaji.json`, { durum: false }).then(() => {
							global.guildData[message.guild.id].sansmesaji.durum = false;
							message.channel.send('Şans mesajı özelliği başarı ile kapatıldı!');
						});
					}
					else {
						message.channel.send('Şans mesajı özelliği zaten kapalı!');
					}
				}
				else if (text.toLowerCase().startsWith('ekle')) {
					let liste = [];
					if (response.data.liste != null) {
						liste = response.data.liste;
					}
					let mesaj = text.split(' ');
					mesaj.shift();
					mesaj = mesaj.join(' ');
					global.guildData[message.guild.id].sansmesaji.liste.push(mesaj);
					axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sansmesaji.json`, { liste: global.guildData[message.guild.id].sansmesaji.liste }).then(() => {
						message.channel.send(`Şans mesajı listesine başarıyla \`${mesaj}\` eklendi!`);
					});
				}
				else if (text.toLowerCase().startsWith('çıkar') || text.toUpperCase().startsWith('ÇIKAR')) {
					let mesaj = text.split(' ');
					mesaj.shift();
					mesaj = mesaj.join('');
					mesaj -= 1;
					// eslint-disable-next-line max-len
					axios.delete(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sansmesaji/liste/${mesaj}.json`).then((rsp) => {
						if (rsp.status == 200) {
							global.guildData[message.guild.id].sansmesaji.liste.splice(mesaj, 1);
							mesaj += 1;
							message.channel.send(`Şans mesajı listesinden başarıyla ${mesaj}. mesaj çıkartıldı!`);
						}
						else {
							message.channel.send('Lütfen geçerli bir mesaj giriniz!');
						}
					});
				}
				else if (text.startsWith('<#')) {
					let channelID = text.split('');
					channelID.shift();
					channelID.shift();
					channelID.pop();
					channelID = channelID.join('');
					axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sansmesaji.json`, { channelID }).then(() => {
						global.guildData[message.guild.id].sansmesaji.channelID = channelID;
						message.channel.send(`Şans mesajı kanalı başarı ile <#${channelID}> olarak ayarlandı!`);
						global.guildData[message.guild.id].sansmesaji.degistirilmeSayisi += 1;
					});
				}
				else if (text == '') {
					const embed = new MessageEmbed()
						.setTitle('Şans Mesajı Komutu')
						.setAuthor(client.user.username, client.user.displayAvatarURL())
						.setColor('#7d18e2')
						.setDescription(`Durum: ${(global.guildData[message.guild.id].sansmesaji.durum ? 'Açık' : 'Kapalı')}\nKanal: ${global.guildData[message.guild.id].sansmesaji.channelID == '' ? 'Belirtilmedi!' : `<#${global.guildData[message.guild.id].sansmesaji.channelID}>`}\nSayı: ${global.guildData[message.guild.id].sansmesaji.sayi == '' ? 'Belirtilmedi!' : `${global.guildData[message.guild.id].sansmesaji.sayi}`}\nListe: \`y!liste\` kullanın!`);
					message.channel.send({ embed });
				}
				else if (text.toLowerCase().startsWith('sayı') || text.toUpperCase().startsWith('SAYI') || text.toLowerCase().startsWith('sayi')) {
					let mesaj = text.split(' ');
					mesaj.shift();
					mesaj = mesaj.join('');
					axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sansmesaji.json`, { sayi: mesaj }).then(() => {
						message.channel.send(`Şans mesajı tekrarlama sayısı başarıyla \`${mesaj}\` olarak ayarlandı!`);
						global.guildData[message.guild.id].sansmesaji.sayi = mesaj;
					});
				}
				else if (text.toLowerCase() == 'liste' || text.toUpperCase() == 'LİSTE') {
					message.channel.send(embed()).then((msg) => {
						msg.react('860213325031014500');
						msg.react('860213325072957511');
						client.setTimeout(() => {
							// eslint-disable-next-line no-unused-vars
							const filterforward = (reaction, user) => reaction.emoji.name === 'forward';
							const collectorforward = msg.createReactionCollector(filterforward, { time: 900000000 });
							// eslint-disable-next-line no-unused-vars
							collectorforward.on('collect', async (reaction, user) => {
								if (sayi + 9 < list.length) {
									sayi += 9;
								}
								if (message.member.id == client.id) {
									return;
								}
								await msg.edit({ embed: embed() });
							});
						}, Number(1500));
						client.setTimeout(() => {
							// eslint-disable-next-line no-unused-vars
							const filterprevious = (reaction, user) => reaction.emoji.name === 'backward';
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
								await msg.edit({ embed: embed() });
							});
						}, Number(1500));
					});
				}
			});
		}
		else {
			message.channel.send('Bunu yapmak için yetkiniz yok! Bu komutu sadece yöneticiler kullanabilir...');
		}
	}
};
