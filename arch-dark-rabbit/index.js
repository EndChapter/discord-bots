/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
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

require('events').EventEmitter.defaultMaxListeners = Infinity;

const client = new CommandoClient({
	commandPrefix: prefix,
	owner: '507232669164109824',
});


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
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', async () => {
	console.log(`${client.user.tag} Hazır!`);
	/* client.user.setActivity(`${prefix}help`, {
		type: 'LISTENING',
	}); */
	const Guilds = client.guilds.cache.map((guild) => guild.name);
	console.log(Guilds, 'Bağlandı!');
	axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/yasaklikelime.json').then((response) => {
		if (response.data == null) {
			global.bannedWords.push('rastgele');
		}
		else {
			for (const key in response.data) {
				global.bannedWords.push(response.data[key].kelime);
			}
		}
	});
	axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/spam.json').then(async (response) => {
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
			await axios.post('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/spam.json', { spam: global.spam }).catch((e) => { console.log(e); });
		}
	});
});

client.on('message', (message) => {
	function ban() {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			new Ban(client).run(message, { id: message.author.id, content: 'Reklam', bot: true });
			message.delete();
		}
	}
	const messageArray = message.content.toLowerCase().split(' ');
	for (let i = 0; i < global.bannedWords.length; i += 1) {
		for (let x = 0; x < messageArray.length; x += 1) {
			if (messageArray[x] == global.bannedWords[i] && !message.member.hasPermission('ADMINISTRATOR')) {
				const guild = client.guilds.cache.get('842425040409460757');
				const logchannel = guild.channels.cache.get('846077502295113738');
				const embed = new MessageEmbed()
					.setTitle('Yasaklı Kelime Kullanıldı!!')
					.setAuthor(client.user.username, client.user.displayAvatarURL())
					.setColor('#030303')
					.setDescription(`Yasaklı Kelimeyi kullanan: ${message.member.user.tag}\n Yasaklı kelimeyi içeren mesaj: ${message.content}`)
					// .setImage("https://media.discordapp.net/attachments/842432330789552129/845250862800175134/IMG_20210521_134459.jpg")
					.setThumbnail('https://cdn.discordapp.com/attachments/844374778479640577/845428636949020712/1621636291169.gif')
					.setTimestamp();
				logchannel.send(embed);
				axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.author.id}/uyarisayisi.json`).then(async (response) => {
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
						.setColor('#030303')
						.setDescription(`Yasaklı kelimeyi içeren mesaj: ${message.content}\n Şimdiye kadar ${sayi} kere uyarıldınız!\n Her 3 Uyarıda 20 dk Mute Alırsınız!`)
						// .setImage("https://media.discordapp.net/attachments/842432330789552129/845250862800175134/IMG_20210521_134459.jpg")
						.setThumbnail('https://cdn.discordapp.com/attachments/844374778479640577/845428636949020712/1621636291169.gif')
						.setTimestamp();
					try {
						message.member.send(embedOne);
					}
					catch (error) {
						message.channel.send(`${message.member.user.tag} Uyarı aldın! Dm'ini açmalısın! Uyarıyı İçeren Mesaj: ${message.content}`)
							.then((msg) => { setTimeout(() => { msg.delete(); }, Number(1000)); });
					}

					message.delete();
					if (post) {
						await axios.post(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.author.id}/uyarisayisi.json`, { uyariSayisi: sayi }).catch((e) => { console.log(e); });
						post = false;
					}
					else {
						await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.author.id}/uyarisayisi/${list[0].id}.json`, { uyariSayisi: sayi }).catch((e) => { console.log(e); });
					}
					if (sayi % 3 == 0) {
						new Mute(client).run(message, {
							id: `<@${message.author.id}>`, content: 'Küfür', interval: '20dk', bot: true,
						});
					}
				});
			}
		}
	}
	if (message.channel.id != '852704836419321946' || message.channel.id != '852997723858010123') {
		if (message.content.startsWith('https://discord.gg')) { ban(); }
		else if (message.content.startsWith('discord.gg')) { ban(); }
		else if (message.content.startsWith('http://discord.gg')) { ban(); }
		if (message.content.length > 1000) {
			if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id != client.user.id) {
				new Mute(client).run(message, {
					id: `<@${message.author.id}>`, content: 'Spam', interval: '5dk', bot: true,
				});
				message.delete();
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
const spamList = [{
	id: '',
	createdTimestamp: '',
	mesajSayisi: 0,
}];
client.on('message', (message) => {
	if (!message.member.hasPermission('ADMINISTRATOR') || message.channel.id != '852704836419321946' || message.channel.id != '852997723858010123') {
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
});

client.on('error', console.error);

client.login(token);
