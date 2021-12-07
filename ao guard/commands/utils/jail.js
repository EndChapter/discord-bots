/* eslint-disable max-statements-per-line */
/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */

'use strict';

const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'jail',
			memberName: 'jail',
			group: 'utils',
			description: 'Bir Kullanıcıyı Jaile Atar.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Mutelanacak kullanıcının idsini gir',
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
		if (message.member.hasPermission('BAN_MEMBERS')) {
			const guild = this.client.guilds.cache.get('853678199405674517');
			const memberTarger = guild.members.cache.get(id);
			if (!memberTarger) {
				message.channel.send('Lütfen geçerli bir id giriniz!').then((msg) => {
					client.setTimeout(() => {
						msg.delete();
						message.delete();
					}, Number(2000));
				});
			}
			else if (content == '') {
				// eslint-disable-next-line no-param-reassign
				message.channel.send('Lütfen geçerli bir sebep giriniz!').then((msg) => {
					client.setTimeout(() => {
						msg.delete();
						message.delete();
					}, Number(2000));
				});
			}
			else {
				await axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/guard/jail/${memberTarger.user.id}.json`).then(async (response) => {
					await axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/guard/kayitno.json').then(async (kyt) => {
						let jailSayisi;
						let	sebepListesi;
						let kayitno;
						if (response.data == null) {
							jailSayisi = 1;
							sebepListesi = {};
						}
						else {
							jailSayisi = response.data.jailSayisi;
							sebepListesi = response.data.sebepListesi;
						}
						if (kyt.data == null) {
							kayitno = 0;
						}
						else {
							kayitno = kyt.data;
						}
						kayitno += 1;
						const onbellekSebepListesi = Object.values(sebepListesi);
						onbellekSebepListesi.push({
							content,
							timestamp: Date.now().valueOf(),
							kayitno,
						});
						const yeniJailSayisi = Number(jailSayisi) + 1;
						const username = memberTarger.user.tag;
						// eslint-disable-next-line max-statements-per-line, func-names, prefer-arrow-callback
						await message.channel.send(`${username} jaile gönderildi!`).then((msg) => {
						// eslint-disable-next-line no-unused-expressions
							client.setTimeout(() => {
								message.delete(); msg.delete();
							}, Number(2000));
						});
						axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/guard/jail/${memberTarger.user.id}.json`,
							{
								jailSayisi: yeniJailSayisi,
								sebepListesi: onbellekSebepListesi,
							});
						await axios.patch('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/guard.json', { kayitno });

						const channel = message.guild.channels.cache.get('853692735471353886');

						// const request = message.member.roles.cache.has('836557251912531968');
						const embed = new MessageEmbed()
							.setColor('#7A0194')
							.setTitle('❗ >> Yeni Bildiri')
							.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
							.setDescription(`${username} Jaile Gönderildi!\n Sebep: ${content}`)
							.setTimestamp();
						channel.send(embed);
					});
				});
				memberTarger.roles.set(['877602439719698432']);
			}
		}
	}
};
