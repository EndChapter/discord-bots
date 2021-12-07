/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */

'use strict';

const { CommandoClient } = require('discord.js-commando');

const { MessageEmbed } = require('discord.js');

const path = require('path');

const { default: axios } = require('axios');
const { prefix, token } = require('./config');
const Mute = require('./commands/utils/mute');
const Ban = require('./commands/utils/ban');

global.bannedWords = [];
global.spam = false;
global.spamkey = '';
global.caps = false;
global.capskey = '';
global.bannedServers = [];
global.mutedUsers = [];

require('events').EventEmitter.defaultMaxListeners = Infinity;

const client = new CommandoClient({
	commandPrefix: prefix,
	owner: '507232669164109824',
});

// TODO invcheck
// TODO mute check
// ! Mesajlalrı sildirmeye kalkarsa silme
// you return whether the command should be blocked
client.registry
	.registerDefaultTypes()
	.registerGroups([
		['utils', 'Guard botunun gerekli komutları'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		eval: false,
		prefix: false,
		commandState: false,
		unknownCommand: false,
		help: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', async () => {
	console.log(`${client.user.tag} Hazır!`);
	/* client.user.setActivity(`${prefix}help`, {
		type: 'LISTENING',
	}); */
	// client.user.setStatus('invisible');
	const Guilds = client.guilds.cache.map((guild) => guild.name);
	console.log(Guilds, 'Bağlandı!');
	axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/yasaklikelime.json').then((response) => {
		if (response.data == null) {
			global.bannedWords.push('rastgele');
		}
		else {
			for (const key in response.data) {
				global.bannedWords.push(response.data[key].kelime);
			}
		}
	});
	axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/spam.json').then(async (response) => {
		let post = false;
		if (response.data == null) {
			post = true;
			global.spam = false;
		}
		else {
			for (const key in response.data) {
				global.spam = response.data[key].spam;
				global.spamkey = key;
			}
		}
		if (post) {
			await axios.post('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/spam.json', { spam: global.spam }).catch((e) => { console.log(e); });
		}
	});
	axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/caps.json').then(async (response) => {
		let post = false;
		if (response.data == null) {
			post = true;
			global.caps = false;
		}
		else {
			for (const key in response.data) {
				global.caps = response.data[key].caps;
				global.capskey = key;
			}
		}
		if (post) {
			await axios.post('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/caps.json', { caps: global.caps }).catch((e) => { console.log(e); });
		}
	});
	axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/bannedServers.json').then((response) => {
		if (response.data != null) {
			for (const key in response.data) {
				global.bannedServers.push(response.data[key].kelime);
			}
		}
	});
});

const spamList = [{
	id: '',
	createdTimestamp: '',
	mesajSayisi: 0,
}];
client.on('message', async (message) => {
	function ban() {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			new Ban(client).run(message, { id: message.author.id, content: 'Reklam', bot: true });
			message.delete();
		}
	}
	function isNumber(n) {
		return Number(n) == n;
	}
	if (message.member.user.bot) {
		return;
	}
	if (message.channel.type !== 'dm') {
		const messageArray = message.content.toLowerCase().split(' ');
		const messageLetterArray = message.content.toLowerCase().split('');
		if (message.member.user.id != '507232669164109824' && message.channel.parentID != '859954455532404736' && !message.member.roles.cache.has('854340781443776542') && message.content != '') {
			if (message.channel.id != '856283849976971284') {
				for (let i = 0; i < global.bannedWords.length; i += 1) {
					for (let x = 0; x < messageArray.length; x += 1) {
						if (messageArray[x] == global.bannedWords[i] && !message.member.hasPermission('ADMINISTRATOR')) {
							const guild = client.guilds.cache.get('853678199405674517');
							const logchannel = guild.channels.cache.get('853692735471353886');
							const embed = new MessageEmbed()
								.setTitle('Yasaklı Kelime Kullanıldı!!')
								.setAuthor(client.user.username, client.user.displayAvatarURL())
								.setColor('#7A0194')
								.setDescription(`Yasaklı Kelimeyi kullanan: ${message.member.user.tag}\n Yasaklı kelimeyi içeren mesaj: ${message.content}`)
								// .setImage("https://media.discordapp.net/attachments/842432330789552129/845250862800175134/IMG_20210521_134459.jpg")
								.setTimestamp();
							logchannel.send(embed);

							axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/uyarisayisi/${message.author.id}.json`).then(async (response) => {
								const list = [];
								let sayi = 0;
								let post = false;
								if (response.data == null) {
									post = true;
									list.push({ id: '', uyariSayisi: 1 });
									sayi = 1;
								}
								else {
									for (const key in response.data) {
										list.push({ id: key, uyariSayisi: response.data[key].uyariSayisi });
										// eski uyarı + 1 yani yeni uyarı da aldı ya
										sayi = list[0].uyariSayisi + 1;
									}
								}
								const embedOne = new MessageEmbed()
									.setTitle('Yasaklı Kelime Kullandığınız için Uyarı Aldınız!!')
									.setAuthor(client.user.username, client.user.displayAvatarURL())
									.setColor('#7A0194')
									.setDescription(`Yasaklı kelimeyi içeren mesaj: ${message.content}\n Şimdiye kadar ${sayi} kere uyarıldınız!\n Her 3 Uyarıda 10 dk Mute Alırsınız!`)
									// .setImage("https://media.discordapp.net/attachments/842432330789552129/845250862800175134/IMG_20210521_134459.jpg")
									.setTimestamp();
								try {
									await message.member.send(embedOne);
								}
								catch (error) {
									message.channel.send(`${message.member.user.tag} Uyarı aldın! Dm'ini açmalısın! Uyarıyı İçeren Mesaj: \`${message.content}\``)
										.then((msg) => { setTimeout(() => { msg.delete(); }, Number(1000)); });
								}

								message.delete();
								if (post) {
									await axios.post(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/uyarisayisi/${message.author.id}.json`, { uyariSayisi: sayi }).catch((e) => { console.log(e); });
									post = false;
								}
								else {
									await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/uyarisayisi/${message.author.id}/${list[0].id}.json`, { uyariSayisi: sayi }).catch((e) => { console.log(e); });
								}


								if (sayi % 3 == 0) {
									new Mute(client).run(message, {
										id: `<@${message.author.id}>`, content: 'Küfür', interval: '10dk', bot: true,
									});
								}
							});
						}
					}
				}
				let etiketSayisi = 0;
				for (let i = 0; i < messageLetterArray.length; i += 1) {
					if (messageLetterArray[i] == '<') {
						if (messageLetterArray[i + 1] == '@') {
							etiketSayisi += 1;
						}
						if (messageLetterArray[i + 1] == '#') {
							etiketSayisi += 1;
						}
					}
				}
				if (!message.member.roles.cache.has('853679626466885664')) {
					if (etiketSayisi > 6) {
						try {
							await message.member.send('Çok fazla kişiden bahsettin !');
						}
						catch {
							message.channel.send('Çok fazla kişiden bahsettin ! Ayrıca dmini bana Açmalısın!').then((m) => {
								client.setTimeout(() => {
									m.delete();
								}, 3000);
							});
						}
						message.delete();
					}
				}
				else if (etiketSayisi > 12) {
					try {
						await message.member.send('Çok fazla kişiden bahsettin !');
					}
					catch {
						message.channel.send('Çok fazla kişiden bahsettin ! Ayrıca dmini bana Açmalısın!').then((m) => {
							client.setTimeout(() => {
								m.delete();
							}, 3000);
						});
					}
					message.delete();
				}
			}
			if (message.channel.id != '852704836419321946' || message.channel.id != '852997723858010123') {
				if (message.content.startsWith('https://discord.gg')) { ban(); }
				else if (message.content.startsWith('discord.gg')) { ban(); }
				else if (message.content.startsWith('http://discord.gg')) { ban(); }
				if (message.content.length > 1000 && message.channel.id != '856283849976971284' && !message.member.user.bot) {
					if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id != client.user.id) {
						new Mute(client).run(message, {
							id: `<@${message.author.id}>`, content: 'Spam', interval: '5dk', bot: true,
						});
						message.delete();
					}
				}
			}
			if (!message.member.hasPermission('ADMINISTRATOR') || message.channel.id != '856283849976971284' || message.channel.id != '852997723858010123') {
				if (!message.member.user.bot && message.member.user.id != '408785106942164992') {
					// console.log(message);
					let spamuser = false;

					if (global.spam == true) {
						const currentDate = new Date();

						for (let i = 0; i < spamList.length; i += 1) {
							if (spamList[i] != undefined) {
								if (spamList[i].id == message.author.id && message.author.id != client.user.id) {
									spamList[i].mesajSayisi += 1;
									// spamList[i].createdTimestamp = message.createdTimestamp;
									spamuser = true;
								}
							}
						}
						if (!spamuser) {
							spamList.push({
								id: message.author.id,
								createdTimestamp: message.createdTimestamp,
								mesajSayisi: 1,
							});
							spamuser = false;
						}
						for (let x = 0; x < spamList.length; x += 1) {
							if (spamList[x] != undefined) {
								if (currentDate - spamList[x].createdTimestamp > 2500) {
									delete spamList[x];
								}
							}
						}
						for (let y = 0; y < spamList.length; y += 1) {
							if (spamList[y] != undefined) {
								if (spamList[y].mesajSayisi > 4) {
									message.channel.send('2.5 saniye içerisinde 5\'den fazla mesaj attığınız için size mute atıyorum. Sunucu kuralları gereği spam yasaklanmıştır!');
									new Mute(client).run(message, {
										id: `<@${spamList[y].id}>`, content: 'Spam', interval: '5dk', bot: true,
									});
									delete spamList[y];
								}
							}
						}
					}
				}
			}
			if (global.caps && message.content.length > 5 && message.member.user.id != '781503385006112789') {
				axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/mesajsayisi/${message.member.id}/level.json`).then(response => {
					if (response.data < 15) {
						let buyukHarfSayisi = 0;
						for (let i = 0; i < message.content.length; i += 1) {
							if (!isNumber(message.content.charAt(i))) {
								if (message.content.charAt(i) == message.content.charAt(i).toUpperCase()) {
									buyukHarfSayisi += 1;
								}
							}
						}
						if (((buyukHarfSayisi / message.content.length) * 100) >= 70) {
							message.member.send('Caps açmak yasak ! ');
							message.delete();
						}
					}
				});
			}
		}
		else if (message.channel.parentID == '859954455532404736') {
			for (let i = 0; i < global.bannedServers.length; i += 1) {
				for (let x = 0; x < messageArray.length; x += 1) {
					if (messageArray[x] == global.bannedServers[i]) {
						message.delete();
						message.member.send('O yasaklı partner');
					}
				}
			}
		}
	}
});
// message.createdTimestamp 5000
/* message.channel.messages.fetch()
	.then(messages => {
		if(messages.filter(m => m.author.id === '84484653687267328').size > 4){

		}
	}).catch(console.error); */

client.on('messageDelete', (message) => {
	if (message.channel.id != '864499098366377984') {
		if (message.member.user.bot) {
			return;
		}
		const guild = client.guilds.cache.get('853678199405674517');
		const logchannel = guild.channels.cache.get('853692735471353886');
		const embed = new MessageEmbed()
			.setTitle('Mesaj Silindi!!')
			.setAuthor(client.user.username, client.user.displayAvatarURL())
			.setColor('#7A0194')
			.setDescription(`Mesajı Silen: ${message.member.user.tag}\n Silinen mesaj: ${message.content}`)
			// .setImage("https://media.discordapp.net/attachments/842432330789552129/845250862800175134/IMG_20210521_134459.jpg")
			.setTimestamp();
		logchannel.send(embed);
	}
});

client.on('messageDeleteBulk', (messages) => {
	if (messages.filter(deger => deger.channel.id == '864499098366377984').size == 0) {
		const length = messages.array().length;
		const channel = messages.first().channel.name;
		const guild = client.guilds.cache.get('853678199405674517');
		const logchannel = guild.channels.cache.get('853692735471353886');
		logchannel.send(`\`\`\`${channel} Kanalında ${length} Mesaj Silindi!\nSilinen Mesajlar: \n ${messages.map(message => `[${message.author.tag}]: ${message.content}\n`)}\`\`\``);
	}
});

client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.member.user.bot) {
		return;
	}
	const guild = client.guilds.cache.get('853678199405674517');
	const logchannel = guild.channels.cache.get('853692735471353886');
	const embed = new MessageEmbed()
		.setTitle('Mesaj Düzenlendi!!')
		.setAuthor(client.user.username, client.user.displayAvatarURL())
		.setColor('#7A0194')
		.setDescription(`Mesajı Düzenleyen: ${oldMessage.member.user.tag}\n Önceki Hali: ${oldMessage.content} \n Sonraki Hali: ${newMessage.content}`)
		// .setImage("https://media.discordapp.net/attachments/842432330789552129/845250862800175134/IMG_20210521_134459.jpg")
		.setTimestamp();
	logchannel.send(embed);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
	if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
		if (oldMember.roles.cache.has('855861447946797118') && !newMember.roles.cache.has('855861447946797118')) {
			const guild = client.guilds.cache.get('853678199405674517');
			const channel = guild.channels.cache.get('853692510748934224');
			const botname = client.user.username;
			const boturl = client.user.displayAvatarURL();
			const embedOne = new MessageEmbed()
				.setColor('#7A0194')
				.setTitle('❗ >> Yeni Bildiri')
				.setImage('https://64.media.tumblr.com/bd14db957995cdcbebb92b86691534ca/348ee68a507bf8d9-86/s500x750/bd7587253b84ba86affb8b34d84b8a498b3df65d.gif')
				.setAuthor(botname, boturl)
				.setDescription(`${newMember.user.username} kullanıcısının susturulması kaldırıldı...`)
				.setTimestamp();
			channel.send(embedOne);
		}
	}
});

client.on('guildMemberRemove', (member) => {
	if (member.roles.cache.has('855861447946797118')) {
		global.mutedUsers.push(member.user.id);
	}
});

client.on('guildMemberAdd', (member) => {
	for (let i = 0; i < global.mutedUsers.length; i += 1) {
		if (global.mutedUsers[i] == member.user.id) {
			member.roles.add('855861447946797118');
		}
	}
});

client.on('error', console.error);

client.login(token);
