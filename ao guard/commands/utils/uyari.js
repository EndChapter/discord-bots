/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */

'use strict';

const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const Mute = require('./mute');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'uyarı',
			memberName: 'uyarı',
			group: 'utils',
			description: 'Bir Kullanıcıyı Uyarır.',
			alias: ['uyari', 'warn'],
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Banlanacak kullanıcının idsini gir',
					type: 'string',
					default: '',
				},
				{
					key: 'content',
					prompt: 'Banlanma sebebi?',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, { id, content }) {
		const { client } = this;
		if (message.member.hasPermission('KICK_MEMBERS')) {
			const guild = this.client.guilds.cache.get('853678199405674517');
			const memberTarger = guild.members.cache.get(id);
			if (!memberTarger) {
				message.channel.send('Lütfen geçerli bir id giriniz!');
			}
			else if (content == '') {
				// eslint-disable-next-line no-param-reassign
				message.channel.send('**Lütfen sebep girip tekrar deneyiniz. ^-^**');
			}
			else {
				await axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/guard/uyarisayisi/${memberTarger.user.id}.json`).then(async (response) => {
					await axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/guard/kayitno.json').then(async (kyt) => {
						let uyariSayisi;
						let	sebepListesi;
						let kayitno;
						if (kyt.data == null) {
							kayitno = 0;
						}
						else {
							kayitno = kyt.data;
						}
						kayitno += 1;
						if (response.data == null) {
							uyariSayisi = 1;
							sebepListesi = {};
						}
						else {
							uyariSayisi = response.data.uyariSayisi;
							sebepListesi = response.data.sebepListesi;
						}
						const embedOne = new MessageEmbed()
							.setTitle('Yönetici Tarafından Uyarı Aldınız!')
							.setAuthor(client.user.username, client.user.displayAvatarURL())
							.setColor('#7A0194')
							.setDescription(`Uyarı Sebebi: ${content}\n Şimdiye kadar ${uyariSayisi} kere yönetici uyarıldınız!\n Her 3 Uyarıda 10 dk Mute Alırsınız!`)
						// .setImage("https://media.discordapp.net/attachments/842432330789552129/845250862800175134/IMG_20210521_134459.jpg")
							.setTimestamp();
						try {
							await memberTarger.send(embedOne);
						}
						catch (error) {
							message.channel.send(`${message.member.user.tag} Uyarı aldın! Dm'ini açmalısın! Uyarıyı İçeren Mesaj: \`${message.content}\``);
						}
						if (uyariSayisi % 3 == 0) {
							new Mute(client).run(message, {
								id: `<@${memberTarger.user.id}>`, content: '3. Uyarı', interval: '10dk', bot: true,
							});
						}
						const onbellekSebepListesi = Object.values(sebepListesi);
						onbellekSebepListesi.push({
							content,
							timestamp: Date.now().valueOf(),
							kayitno,
						});
						const yeniUyariSayisi = Number(uyariSayisi) + 1;
						const username = memberTarger.user.tag;
						// eslint-disable-next-line max-statements-per-line, func-names, prefer-arrow-callback
						await message.channel.send(`${username} uyarıldı!`);
						await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/guard/uyarisayisi/${memberTarger.user.id}.json`,
							{
								uyariSayisi: yeniUyariSayisi,
								sebepListesi: onbellekSebepListesi,
							});
						await axios.patch('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/guard.json', { kayitno });
						// const request = message.member.roles.cache.has('836557251912531968');
						const embed = new MessageEmbed()
							.setColor('#7A0194')
							.setTitle('❗ >> Yeni Bildiri')
							.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
							.setDescription(`${username} Uyarıldı!\n Sebep: ${content}`)
							.setTimestamp();
						message.channel.send(embed);
					});
				});
			}
		}
	}
};
