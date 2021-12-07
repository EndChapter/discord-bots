/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class welcome extends Command {
	constructor(client) {
		super(client, {
			name: 'hosgeldin',
			aliases: ['hoşgeldin'],
			group: 'general',
			memberName: 'hoşgeldin',
			description: 'Şans mesajı özelliğini yönetir(Aç/açık, Kapat/kapalı, Mesajı/Mesaj , #kanal)',
			args: [
				{
					key: 'text',
					prompt: 'hoşgeldin özelliği ile ne yapmak istersin?',
					type: 'string',
					default: '',
				},
			],
		});
	}

	run(message, { text }) {
		const { client } = this;
		if (message.guild.ownerID == message.member.user.id || message.member.user.id == '853675153333157910') {
			axios.get(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/hosgeldinmesaji.json`).then((response) => {
				// Turkish cases may cause some problems so i
				if (text.toLowerCase() == 'aç' || text.toUpperCase() == 'AÇ' || text.toLowerCase() == 'açık' || text.toUpperCase() == 'AÇIK') {
					if (response.data.durum == false) {
						if (global.guildData[message.guild.id].hosgeldinmesaji.mesaj != '' && global.guildData[message.guild.id].hosgeldinmesaji.channelID) {
							axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/hosgeldinmesaji.json`, { durum: true }).then(() => {
								global.guildData[message.guild.id].hosgeldinmesaji.durum = true;
								message.channel.send('Hoş geldin mesajı özelliği başarı ile açıldı!');
							});
						}
						else {
							message.channel.send('Bu özelliğin açılabilmesi için kanal(`y!hosgeldin #kanal`) ve mesaj(`y!hosgeldin mesaj <mesajicerigi>`) belirtilmelidir!');
						}
					}
					else {
						message.channel.send('Hoş geldin mesajı özelliği zaten açık!');
					}
				}
				else if (text.toLowerCase() == 'kapat' || text.toLowerCase() == 'kapalı' || text.toUpperCase() == 'KAPALI') {
					if (response.data.durum == true) {
						axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/hosgeldinmesaji.json`, { durum: false }).then(() => {
							global.guildData[message.guild.id].hosgeldinmesaji.durum = false;
							message.channel.send('Hoş geldin mesajı özelliği başarı ile kapatıldı!');
						});
					}
					else {
						message.channel.send('Hoş geldin mesajı özelliği zaten kapalı!');
					}
				}
				else if (text.toLowerCase().startsWith('mesajı') || text.toUpperCase().startsWith('MESAJI') || text.toLowerCase().startsWith('mesaj')) {
					let mesaj = text.split(' ');
					mesaj.shift();
					mesaj = mesaj.join(' ');
					axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/hosgeldinmesaji.json`, { mesaj }).then(() => {
						global.guildData[message.guild.id].hosgeldinmesaji.mesaj = mesaj;
						message.channel.send(`Hoş geldin mesajı başarıyla \`${mesaj}\` olarak ayarlandı!`);
						global.guildData[message.guild.id].hosgeldinmesaji.degistirilmeSayisi += 1;
					});
				}
				else if (text.startsWith('<#')) {
					let channelID = text.split('');
					channelID.shift();
					channelID.shift();
					channelID.pop();
					channelID = channelID.join('');
					global.guildData[message.guild.id].hosgeldinmesaji.channelID = channelID;
					axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/hosgeldinmesaji.json`, { channelID }).then(() => {
						message.channel.send(`Hoş geldin mesajı kanalı başarı ile <#${channelID}> olarak ayarlandı!`);
						global.guildData[message.guild.id].hosgeldinmesaji.degistirilmeSayisi += 1;
					});
				}
				else if (text == '') {
					const embed = new MessageEmbed()
						.setTitle('Hoş geldin Komutu')
						.setAuthor(client.user.username, client.user.displayAvatarURL())
						.setColor('#7d18e2')
						.setDescription(`Durum: ${(global.guildData[message.guild.id].hosgeldinmesaji.durum ? 'Açık' : 'Kapalı')}\nKanal: ${global.guildData[message.guild.id].hosgeldinmesaji.channelID == '' ? 'Belirtilmedi!' : `<#${global.guildData[message.guild.id].hosgeldinmesaji.channelID}>`}\nMesaj: \`${global.guildData[message.guild.id].hosgeldinmesaji.mesaj}\``);
					message.channel.send({ embed });
				}
			});
		}
		else {
			message.channel.send('Bunu yapmak için yetkiniz yok! Bu komutu sadece yöneticiler kullanabilir...');
		}
	}
};
