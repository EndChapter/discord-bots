/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const functions = require('../../functions');

module.exports = class newdaymessagechecker extends Command {
	constructor(client) {
		super(client, {
			name: '00:00',
			aliases: ['00:00'],
			group: 'general',
			memberName: '00:00',
			description: '00:00 özelliğini yönetir(Aç/açık, Kapat/kapalı, Mesajı/Mesaj , #kanal)',
			args: [
				{
					key: 'text',
					prompt: '00:00 özelliği ile ne yapmak istersin?',
					type: 'string',
					default: '',
				},
			],
		});
	}

	run(message, { text }) {
		const { client } = this;
		if (message.guild.ownerID == message.member.user.id || message.member.user.id == '853675153333157910') {
			axios.get(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sifirSifirMesaji.json`).then((response) => {
				// Turkish cases may cause some problems so i

				if (text.toLowerCase() == 'aç' || text.toUpperCase() == 'AÇ' || text.toLowerCase() == 'açık' || text.toUpperCase() == 'AÇIK') {
					if (response.data.durum == false) {
						if (global.guildData[message.guild.id].sifirSifirMesaji.channelID != '' && global.guildData[message.guild.id].sifirSifirMesaji.mesaj != '') {
							axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sifirSifirMesaji.json`, { durum: true }).then(() => {
								global.guildData[message.guild.id].sifirSifirMesaji.durum = true;
								message.channel.send('00:00 mesajı özelliği başarı ile açıldı!');
								global.guildData[message.guild.id].sifirSifirMesaji.degistirilmeSayisi += 1;
								functions.timeout(client, global.guildData[message.guild.id].id, global.guildData[message.guild.id].sifirSifirMesaji.channelID, global.guildData[message.guild.id].sifirSifirMesaji.mesaj, global.guildData[message.guild.id].sifirSifirMesaji.degistirilmeSayisi);
							});
						}
						else {
							message.channel.send('Bu özelliğin açılabilmesi için kanal(`y!00:00 #kanal`) ve mesaj(`y!00:00 mesaj <mesajicerigi>`) belirtilmelidir!');
						}
					}
					else {
						message.channel.send('00:00 mesajı özelliği zaten açık!');
					}
				}
				else if (text.toLowerCase() == 'kapat' || text.toLowerCase() == 'kapalı' || text.toUpperCase() == 'KAPALI') {
					if (response.data.durum == true) {
						axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sifirSifirMesaji.json`, { durum: false }).then(() => {
							global.guildData[message.guild.id].sifirSifirMesaji.durum = false;
							message.channel.send('00:00 mesajı özelliği başarı ile kapatıldı!');
							global.guildData[message.guild.id].sifirSifirMesaji.degistirilmeSayisi += 1;
							functions.timeout(client, global.guildData[message.guild.id].id, global.guildData[message.guild.id].sifirSifirMesaji.channelID, global.guildData[message.guild.id].sifirSifirMesaji.mesaj, global.guildData[message.guild.id].sifirSifirMesaji.degistirilmeSayisi);
						});
					}
					else {
						message.channel.send('00:00 mesajı özelliği zaten kapalı!');
					}
				}
				else if (text.toLowerCase().startsWith('mesajı') || text.toUpperCase().startsWith('MESAJI') || text.toLowerCase().startsWith('mesaj')) {
					let mesaj = text.split(' ');
					mesaj.shift();
					mesaj = mesaj.join(' ');
					axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sifirSifirMesaji.json`, { mesaj }).then(() => {
						global.guildData[message.guild.id].sifirSifirMesaji.mesaj = mesaj;
						message.channel.send(`00:00 mesajı başarıyla \`${mesaj}\` olarak ayarlandı!`);
						global.guildData[message.guild.id].sifirSifirMesaji.degistirilmeSayisi += 1;
						functions.timeout(client, global.guildData[message.guild.id].id, global.guildData[message.guild.id].sifirSifirMesaji.channelID, global.guildData[message.guild.id].sifirSifirMesaji.mesaj, global.guildData[message.guild.id].sifirSifirMesaji.degistirilmeSayisi);
					});
				}
				else if (text.startsWith('<#')) {
					let channelID = text.split('');
					channelID.shift();
					channelID.shift();
					channelID.pop();
					channelID = channelID.join('');
					global.guildData[message.guild.id].sifirSifirMesaji.channelID = channelID;
					axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${message.guild.id}/sifirSifirMesaji.json`, { channelID }).then(() => {
						message.channel.send(`00:00 mesaj kanalı başarı ile <#${channelID}> olarak ayarlandı!`);
						global.guildData[message.guild.id].sifirSifirMesaji.degistirilmeSayisi += 1;
						functions.timeout(client, global.guildData[message.guild.id].id, global.guildData[message.guild.id].sifirSifirMesaji.channelID, global.guildData[message.guild.id].sifirSifirMesaji.mesaj, global.guildData[message.guild.id].sifirSifirMesaji.degistirilmeSayisi);
					});
				}
				else if (text == '') {
					const embed = new MessageEmbed()
						.setTitle('00:00 Komutu')
						.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
						.setColor('#7d18e2')
						.setDescription(`Durum: ${(global.guildData[message.guild.id].sifirSifirMesaji.durum ? 'Açık' : 'Kapalı')}\nKanal: ${global.guildData[message.guild.id].sifirSifirMesaji.channelID == '' ? 'Belirtilmedi!' : `<#${global.guildData[message.guild.id].sifirSifirMesaji.channelID}>`}\nMesaj: \`${global.guildData[message.guild.id].sifirSifirMesaji.mesaj}\``);
					message.channel.send({ embed });
				}
			});
		}
		else {
			message.channel.send('Bunu yapmak için yetkiniz yok! Bu komutu sadece yöneticiler kullanabilir...');
		}
	}
};
