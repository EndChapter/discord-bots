/* eslint-disable no-tabs */

'use strict';

const { SapphireClient } = require('@sapphire/framework');
const {
	Collection, Intents, MessageEmbed, MessageAttachment,
} = require('discord.js');
const { createReadStream } = require('fs');
const { token, prefix } = require('./config');
const {
	joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, createAudioResource, StreamType,
} = require('@discordjs/voice');
const { default: axios } = require('axios');
const Canvas = require('canvas');


const client = new SapphireClient({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS],
	defaultPrefix: prefix,
	presence: { activities: [{ name: `${prefix}help`, type: 'LISTENING' }], status: 'invisible' },
	regexPrefix: /^(Botcuk +)?bana[,! ]/i,
});
let voiceObject = {};

const guildInvites = [];

global.initialized = false;
global.levelUpNumber = 0;
const afkMessage = {};
let connection = () => {};

client.once('ready', async () => {
	/* const list = client.guilds.cache.get('879758969814515752');
	list.members.forEach(member => {
		member.ban();
	}); */

	await axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/levelUp.json').then(async (response) => {
		global.levelUpNumber = response.data.number;
		global.initialized = true;
	});

	/* const user = guild.members.cache.get('507232669164109824');
	user.roles.add('879802575707320370'); */
	// commit değiştirme yorumu
	voiceObject = {
		channelId: '879821757400354916',
		guildId: '879758969814515752',
		adapterCreator: channel.guild.voiceAdapterCreator,
	};
	connection = joinVoiceChannel(voiceObject);
	connection.on(VoiceConnectionStatus.Ready, () => {
		console.log('The connection has entered the Ready state - ready to play audio!');
	});
	Canvas.registerFont('./resources/fonts/OpenSans.ttf', {
		family: 'Open Sans',
	});
	console.log(`${client.user.tag} Hazır!`);
	// eslint-disable-next-line no-inline-comments
	// 'Doğum günü rolleri için uğraşıyor', {
	/* client.user.setActivity({
		activities: [{
			name: `${prefix}help`,
			type: 'LISTENING',
		}],
		status: 'Edip <3' }); */
	// !invite controller
	// eslint-disable-next-line no-restricted-syntax
	for (const guildD of client.guilds.cache.values()) {
		// Here we are getting all invites for the guild
		// Using our client.invites collection we created,
		// we are saving all invites to the cache by guild id.
		guildD.invites.fetch()
			.then((invite) => {
				// guildInvites.push(invite);
				invite.forEach((inv) => {
					guildInvites.push({
						guildId: '879758969814515752',
						code: inv.code,
						uses: inv.uses,
						inviter: inv.inviter,
						channel: inv.channel,
					});
				});
			})
			.catch((error) => console.log(error));
	}
	const Guilds = client.guilds.cache.map((guildd) => guildd.name);
	console.log(Guilds, 'Bağlandı!');
});

client.on('messageCreate', async (message) => {
	if (message.member) {
		if (message.mentions.members.size != 0) {
			message.mentions.users.each(user => {
				axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/afkmesaji/${user.user.id}/content.json`).then(async response => {
					if (response.data != null) {
						afkMessage[user.user.id] = {
							timeout: true,
						};
						setTimeout(async () => {
							try {
								const webhooks = await message.channel.fetchWebhooks();
								const webhook = webhooks.first();
								webhook.send({
									username: user.user.username + '[AFK]',
									content: `**${response.data}**`,
									avatarURL: user.user.displayAvatarURL(),
								});
							}
							catch {
								message.channel.createWebhook(user.user.username, {
									avatar: user.user.displayAvatarURL(),
									channel: message.channel.id,
								}).then((webhook) => {
									webhook.send({
										username: user.user.username + '[AFK]',
										content: `**${response.data}**`,
										avatarURL: user.user.displayAvatarURL(),
									});
								}).catch(console.error);
							}
						}, 30000);// DEĞİŞTİR BURAYI BİR SIFIR KOYACAKSIN
					}
				}).catch(console.log);
			}).catch(console.log);
		}
		if (message.content.toLowerCase() === 'sa') {
			message.react('881624454176841728');
			message.reply('**Aleyküm selam, Hoş Geldin ^-^**');
		}
		const messageArray = message.content.split(' ');
		for (let i = 0; i < messageArray.length; i += 1) {
			if (messageArray[i] == 31) {
				message.delete();
			}
			if (messageArray[i].toLowerCase().startsWith(':')) {
				if (!message.member.user.bot) {
					const emojiname = messageArray[i].split(':');
					const emojiarray = client.emojis.cache.find(emoji => emoji.name === emojiname[1]);
					messageArray[i] = `<a:${emojiname[1]}:${emojiarray.id}>`;
					if (!emojiarray) {
						return;
					}
					const msg = messageArray.join(' ');
					message.delete();
					try {
						const webhooks = await message.channel.fetchWebhooks();
						const webhook = webhooks.first();
						webhook.send({
							username: message.member.user.username,
							content: msg,
							avatarURL: message.member.user.displayAvatarURL(),
						});
					}
					catch {
						message.channel.createWebhook(message.member.user.username, {
							avatar: message.member.user.displayAvatarURL(),
							channel: message.channel.id,
						}).then((webhook) => {
							webhook.send({
								username: message.member.user.username,
								content: msg,
								avatarURL: message.member.user.displayAvatarURL(),
							});
						})
							.catch(console.error);
					}
					/* message.channel.send(`${message.member.user.username}:`);
					message.channel.send(`<a:${emojiname[1]}:${emojiarray.id}>`);
					message.delete(); */
				}
			}
		}
		if (message.content.toLowerCase().startsWith(':')) {
			if (!message.member.user.bot) {
				const emojiname = message.content.split(':');
				const emojiarray = client.emojis.cache.find(emoji => emoji.name === emojiname[1]);
				message.delete();
				try {
					const webhooks = await message.channel.fetchWebhooks();
					const webhook = webhooks.first();
					webhook.send({
						username: message.member.user.username,
						content: `<a:${emojiname[1]}:${emojiarray.id}>`,
						avatarURL: message.member.user.displayAvatarURL(),
					});
				}
				catch {
					message.channel.createWebhook(message.member.user.username, {
						avatar: message.member.user.displayAvatarURL(),
						channel: message.channel.id,
					}).then((webhook) => {
						webhook.send({
							username: message.member.user.username,
							content: `<a:${emojiname[1]}:${emojiarray.id}>`,
							avatarURL: message.member.user.displayAvatarURL(),
						});
					})
						.catch(console.error);
				}
				/* message.channel.send(`${message.member.user.username}:`);
				message.channel.send(`<a:${emojiname[1]}:${emojiarray.id}>`);
				message.delete(); */
			}
		}
	}
});


client.on('messageCreate', async (message) => {
	if (message.guild != null && global.initialized && message.member && message.channel.id != '859399336239562822') {
		if (!message.member.user.bot) {
			/* console.log(`User: ${message.member.user.tag}`);
			console.log(message.content); */
			const guild = client.guilds.cache.get('879758969814515752');
			const channel = guild.channels.cache.get('880060124314607656');


			axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/mesajsayisi/${message.member.id}.json`).then(async (response) => {
				let user = {};
				if (response.data == null) {
					await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/mesajsayisi/${message.member.id}.json`, { sayi: 1, level: 0 });
					user = {
						sayi: 1,
						level: 0,
					};
				}
				else {
					user = {
						sayi: response.data.sayi,
						level: response.data.level,
					};
				}
				user.sayi += 2;
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/mesajsayisi/${message.member.id}.json`, { sayi: user.sayi, level: user.level });


				// eslint-disable-next-line max-len
				const levelUpCoefficientOne = global.levelUpNumber + (global.levelUpNumber * user.level);
				const embedColor = '#FF9E4F';

				if (user.sayi >= levelUpCoefficientOne) {
					user.sayi -= levelUpCoefficientOne;
					if (user.sayi < 0) {
						user.sayi = 1;
					}
					user.level += 1;

					const canvas = Canvas.createCanvas(1440, 321);
					const context = canvas.getContext('2d');
					const background = await Canvas.loadImage('https://i.hizliresim.com/gtjukd5.jpg');
					context.drawImage(background, 0, 0, canvas.width, canvas.height);
					const applyText = (canvas, text) => {
						const context = canvas.getContext('2d');

						let fontSize = 50;

						do {
							context.font = `bold ${fontSize -= 1}px Open Sans`;
						} while (context.measureText(text).width > 635);

						return context.font;
					};
					context.font = applyText(canvas, `Tebrikler ${message.member.nickname == null ? message.member.user.username : message.member.nickname} seviye atladın.\nYeni Seviyen: ${user.level}`);
					context.fillStyle = '#ffffff';
					context.fillText(`Tebrikler ${message.member.nickname == null ? message.member.user.username : message.member.nickname} seviye atladın.\nYeni Seviyen: ${user.level}`, canvas.width / 1.9, canvas.height / 2);


					const attachment = new MessageAttachment(canvas.toBuffer(), 'levelup.png');


					channel.send({ files: [attachment], content: `<@${message.member.id}>` });


					/* const embed = new MessageEmbed()
						.setTitle('**Offf işte bu bir sayı!**')
						.setColor(embedColor)
						.setDescription(`**Tebrikler** <@${message.member.id}> **Seviye atladın.**\n\nYeni Seviyen: ${user.level}`);

					channel.send({ content: `<@${message.member.id}>`, embeds: [embed] }); */

					const levelIds = {
						five: '879808285014900777',
						fiveTeen: '879808414073638992',
						twentyFive: '879808615693811762',
						thirtyFive: '879808640142442586',
						fourtyFive: '879808713014247484',
						fifty: '879808796891955200',
					};

					if (user.level >= 5 && !message.member.roles.cache.has(levelIds.five)) {
						await message.member.roles.add(levelIds.five);
						const fiveLevel = new MessageEmbed()
							.setTitle('Vaaay bu hız sana çok yakıştı!')
							.setColor(embedColor)
							.setDescription(`** Tebrikler** <@${message.member.id}> **5 Level'a ulaştın.**`)
							.setImage('https://i.hizliresim.com/b7ewgl9.gif');

						channel.send({ content: `<@${message.member.id}>`, embeds: [fiveLevel] });
					}
					if (user.level >= 15 && !message.member.roles.cache.has(levelIds.fiveTeen)) {
						await message.member.roles.add(levelIds.fiveTeen);
						const fiveTeenLevel = new MessageEmbed()
							.setTitle('Vaaay bu hız sana çok yakıştı!')
							.setColor(embedColor)
							.setDescription(`** Tebrikler** <@${message.member.id}> **15 Level'a ulaştın.**`)
							.setImage('https://i.hizliresim.com/b7ewgl9.gif');

						channel.send({ content: `<@${message.member.id}>`, embeds: [fiveTeenLevel] });
					}
					if (user.level >= 25 && !message.member.roles.cache.has(levelIds.twentyFive)) {
						await message.member.roles.add(levelIds.twentyFive);
						const twentyFiveLevel = new MessageEmbed()
							.setTitle('Vaaay bu hız sana çok yakıştı!')
							.setColor(embedColor)
							.setDescription(`** Tebrikler** <@${message.member.id}> **25 Level'a ulaştın.**`)
							.setImage('https://i.hizliresim.com/b7ewgl9.gif');

						channel.send({ content: `<@${message.member.id}>`, embeds: [twentyFiveLevel] });
					}
					if (user.level >= 35 && !message.member.roles.cache.has(levelIds.thirtyFive)) {
						await message.member.roles.add(levelIds.thirtyFive);
						const thirtyFiveLevel = new MessageEmbed()
							.setTitle('Vaaay bu hız sana çok yakıştı!')
							.setColor(embedColor)
							.setDescription(`** Tebrikler** <@${message.member.id}> **35 Level'a ulaştın.**`)
							.setImage('https://i.hizliresim.com/b7ewgl9.gif');

						channel.send({ content: `<@${message.member.id}>`, embeds: [thirtyFiveLevel] });
					}
					if (user.level >= 45 && !message.member.roles.cache.has(levelIds.fourtyFive)) {
						await message.member.roles.add(levelIds.fourtyFive);
						const fourtyFiveLevel = new MessageEmbed()
							.setTitle('Vaaay bu hız sana çok yakıştı!')
							.setColor(embedColor)
							.setDescription(`** Tebrikler** <@${message.member.id}> **45 Level'a ulaştın.**`)
							.setImage('https://i.hizliresim.com/b7ewgl9.gif');

						channel.send({ content: `<@${message.member.id}>`, embeds: [fourtyFiveLevel] });
					}
					if (user.level >= 45 && !message.member.roles.cache.has(levelIds.fifty)) {
						await message.member.roles.add(levelIds.fifty);
						const fourtyFiveLevel = new MessageEmbed()
							.setTitle('Vaaay bu hız sana çok yakıştı!')
							.setColor(embedColor)
							.setDescription(`** Tebrikler** <@${message.member.id}> **50 Level'a ulaştın.**`)
							.setImage('https://i.hizliresim.com/b7ewgl9.gif');

						channel.send({ content: `<@${message.member.id}>`, embeds: [fourtyFiveLevel] });
					}

					await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/mesajsayisi/${message.member.id}.json`, { sayi: user.sayi, level: user.level });
				}
			});
		}
	}
});

client.on('guildMemberAdd', async (member) => {
	const guild = client.guilds.cache.get('879758969814515752');
	const gelenChannel = guild.channels.cache.get('881517969920897044');
	member.roles.add('879805246820474882');
	guild.members.fetch().then(async (m) => {
		gelenChannel.send(`**Hoş geldin** <@${member.user.id}>, **seninle birlikte \`${m.size}\` kişi olduk!** ||<@&881955488743428156>||`);
		setTimeout(() => {
			const embed = new MessageEmbed()
				.setColor(0xa50404)
				.setImage('https://i.hizliresim.com/clqdyxb.gif')
				.setDescription('\n\n ╭𝅄᠂꒰:cherries:꒱・<#879823676600623155> kısmından kurallarımızı okuyabilirsin・੭\n┆\n┆・꒰:white_flower:꒱・<#881516753404956683> ve <#881516877342474281> \n┆𝅄᠂kanalından size uygun rolleri bulabilirsiniz.\n┆\n╰𝅄᠂꒰:lollipop:꒱・<#881520326935207967> kanalından kendini tanıtabilirsin :dizzy:・੭\n');
			gelenChannel.send({ embeds: [embed] }).then((msg) => {
				// eslint-disable-next-line max-nested-callbacks
				setTimeout(() => {
					msg.delete();
				}, 15000);
			});
		}, 500);
	});
	const newInvites = await member.guild.invites.fetch();
	let usedInvite;

	usedInvite = newInvites.find((invite) => {
		for (let i = 0; i < guildInvites.length; i++) {
			if (guildInvites[i].code == invite.code) {
				if (guildInvites[i].uses < invite.uses) {
					return invite;
				}
			}
		}
	});

	const logChannel = member.guild.channels.cache.find((channel) => channel.id === '881512914824073226');

	if (!logChannel) return;
	// member.user bizim gelen userimiz
	// inviter bizim davet eden adamımız
	// eslint-disable-next-line no-unused-vars
	const { inviter } = usedInvite;


	axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/kayitlar.json').then(async (response) => {
		const list = [];
		let kayitEdildi = false;
		let kayitSayisi = 0;
		let kayitEdenId = 0;
		let post = false;

		if (response.data == null) {
			post = true;
		}
		else {
			for (const key in response.data) {
				// eslint-disable-next-line no-inline-comments
				list.push({ kayitEdenId: response.data[key].kayitEdenId, kayitEdilenId: response.data[key].kayitEdilenId });
			}
		}
		if (post) {
			list.push({ kayitEdenId: inviter.id, kayitEdilenId: member.user.id });
		}
		else {
			for (let i = 0; i < list.length; i += 1) {
				// kayıt edilip edilmediğini kontrol ediyoruz
				if (list[i].kayitEdilenId == member.user.id) {
					kayitEdildi = true;
					kayitEdenId = list[i].kayitEdenId;
				}
				// kayıt edenin kayıt sayısını hesaplamak gerek
				if (list[i].kayitEdenId == inviter.id) {
					kayitSayisi += 1;
				}
			}
		}
		if (kayitEdildi) {
			const embed = new MessageEmbed()
				.setAuthor(`${member.user.tag} Katıldı!`, member.user.displayAvatarURL())
				.setDescription(`<:aoshi_flower:887344268715360376> **Davet Şu Kişi Tarafından Oluşturuldu:** <@${inviter.id}>\n⠄⠂⠁⠁⠂⠄⠄⠂⠁⠁⠂⠄⠄⠂⠁⠁⠂⠄⠄\n<:aoshi_flower:887344268715360376> **Davet Şu Kadar Kullanıldı:** ${kayitSayisi}\n⠄⠂⠁⠁⠂⠄⠄⠂⠁⠁⠂⠄⠄⠂⠁⠁⠂⠄⠄\n<:aoshi_flower:887344268715360376> **Bu kişi zaten** <@${kayitEdenId}> **Tarafından davet edilmişti.. Davet sayınız artmayacak!**`)
				.setColor('#C29ED2');
			logChannel.send({ embeds: [embed] });
		}
		else {
			kayitSayisi += 1;

			const embed = new MessageEmbed()
				.setAuthor(`${member.user.tag} Katıldı!`, member.user.displayAvatarURL())
				.setDescription(`<:aoshi_flower:887344268715360376> **Davet Şu Kişi Tarafından Oluşturuldu:** <@${inviter.id}>\n⠄⠂⠁⠁⠂⠄⠄⠂⠁⠁⠂⠄⠄⠂⠁⠁⠂⠄⠄\n<:aoshi_flower:887344268715360376> **Davet Şu Kadar Kullanıldı:** ${kayitSayisi}`)
				.setColor('#C29ED2');

			logChannel.send({ embeds: [embed] });

			axios.post('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/kayitlar.json', { kayitEdenId: inviter.id, kayitEdilenId: member.user.id });
		}
	});
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
	if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
		if (!oldMember.roles.cache.has('879796555987705906') && newMember.roles.cache.has('879796555987705906')) {
			oldMember.roles.add('891498602101350401');
		}
		if (!oldMember.roles.cache.has('891498602101350401') && newMember.roles.cache.has('891498602101350401')) {
			const guild = client.guilds.cache.get('879758969814515752');
			/* const user = await guild.members.cache.get(newMember.user.id);
			user.roles.add('879796555987705906'); */
			const channel = guild.channels.cache.get('881512561638535208');
			const embed = {
				title: '**୨<a:aoshi_butterfly:880050344288202792>๑ İşte bir boost daha! Teşekkür ederiiz! ꒷ ₊˚"*',
				color: '#03006B',
				description: '₊˚<:aoshi_flower:887344268715360376>๑ <@' + newMember.user.id + '>, Aoshima sunucusunu desteklediğin için teşekkürler, umarım bizimle vakit geçirdiğin için keyfin yerindedir. Eğer değilse bile sana kocaman sarılarak bu işi çözebiliriz! Bizimle vakit geçirirken şunu unutma ki bizi destekleyenler olunca daha fazla motive oluyoruz. Siz bizim için değerli insanlarsınız! ^-^'
				+ '\n︶꒦ ✧ ⊹₊⁀<a:moon:891489844419784744>'
				+ '\n\n<:aoshi_flower:887344268715360376>₊˚ Senin desteğin ile Aoshima\'nın toplam **' + guild.premiumSubscriptionCount + '** boostu var!'
				+ '\n\n****⊹ <a:purple_question:891487147100606515>₊Boost avantajları nelerdir?***'
				+ '\n✧﹕<@&891498602101350401> ve <@&879796555987705906> rolüne sahip olup diğer üyelerden üstte gözükürsünüz.'
				+ '\n✦﹕Level gerektirmeden sunucuda kullanıcı adınızı değiştirebilirsiniz.'
				+ '\n✧﹕<#881517969920897044> kanalına görsel atabilme hakkınız olur.'
				+ '\n✦﹕Özel renk açtırabilirsiniz.'
				+ '\n✧﹕Etiket sınırınız 5 olur.',
				timestamp: '',
				/* author: {
					name: 'Bizi desteklediğin için teşekkürler dostum !',
				}, */
				image: {
					url: 'https://i.hizliresim.com/coopwqh.jpg',
				},
				thumbnail: {
					url: 'https://i.hizliresim.com/9wmx36w.gif',
				},
				footer: {},
				fields: [],
			};
			const attachment = new MessageAttachment('https://i.hizliresim.com/3hdv7u4.gif');
			await channel.send({ files: [attachment] });
			await channel.send({ content: `<@${newMember.user.id}>`, embeds: [embed] });
		}
		/* else if (!oldMember.roles.cache.has('859954910556979250') && newMember.roles.cache.has('859954910556979250')) {
			const guild = client.guilds.cache.get('853678199405674517');
			// const user = await guild.members.cache.get(newMember.user.id);
			// user.send('');
			axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/partnersorumlulari/${newMember.user.id}.json`, {
				id: newMember.user.id,
				name: newMember.user.username,
				gunlukpartner: 0,
				toplampartner: 0,
			});
		}
		if (oldMember.roles.cache.has('853679626466885664') && !newMember.roles.cache.has('853679626466885664')) {
			const guild = client.guilds.cache.get('853678199405674517');
			const user = await guild.members.cache.get(newMember.user.id);
			user.roles.remove('863375774413488149');
		} */
		/* else if (oldMember.roles.cache.has('859954910556979250') && !newMember.roles.cache.has('859954910556979250')) {
			axios.delete(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshimay/partnersorumlulari/${newMember.user.id}.json`);
		} */
	}

	if (oldMember.premiumSince !== newMember.premiumSince) {

	}
});

client.on('voiceStateUpdate', async (oldState, newState) => {
	if (newState.channelId == '879821757400354916') {
		const player = createAudioPlayer();
		player.on('error', error => {
			console.error('Error:', error.message, 'with track', error.resource.metadata.title);
		});
		let voicePath = './src/voice/tuturu.mp3';
		if (newState.member.user.id == '853675153333157910') {
			voicePath = './src/voice/1.mp3';
		}
		const resource = createAudioResource(createReadStream(voicePath), {
			metadata: {
				title: 'Okaeri!',
			},
		});
		resource.playStream.on('error', error => {
			console.error('Error:', error.message, 'with track', resource.metadata.title);
		});
		player.play(resource);
		setTimeout(() => {
			connection.subscribe(player);
		}, 5000);
	}
});


client.on('interactionCreate', async (interaction) => {
	// !BUG send dm
	const guild = client.guilds.cache.get(interaction.guildId);
	const user = await guild.members.cache.get(interaction.user.id);

	const levelIds = {
		none: '879805246820474882',
		five: '879808285014900777',
		fiveTeen: '879808414073638992',
		twentyFive: '879808615693811762',
		thirtyFive: '879808640142442586',
		fourtyFive: '879808713014247484',
		fifty: '879808796891955200',
		booster: '879796555987705906',
		divine: '881662558455599105',
	};

	const colors = {
		colorOne: '881582444325773432',
		colorTwo: '881582750644191233',
		colorThree: '881583155147059241',
		colorFour: '881586848269488229',
		colorFive: '881583860184408065',
		colorSix: '881583641912819743',
		colorSeven: '881582976356450373',
		colorEight: '881592495098716250',
		colorNine: '881584398657544254',
		colorTen: '881595217344593960',
		colorEleven: '881593302464483339',
		colorTwelve: '881594386603991040',
		colorThirteen: '881594805845626990',
		colorFourteen: '881595000750747689',
		colorFiveteen: '881593695269445693',
		colorSixteen: '881595480201637929',
		colorSeventeen: '881595943433146410',
		colorEighteen: '881596380475445259',
		colorNineteen: '881596684180791346',
		colorTwenty: '881597094417272833',
		colorTwentyOne: '881597529408552981',
		colorTwentyTwo: '881597989456596992',
		colorTwentyThree: '881598214262894612',
		colorTwentyFour: '881598300841726073',
		colorTwentyFive: '881598866997248000',
		colorTwentySix: '881598779168534569',
		colorTwentySeven: '881598655990218873',
		colorTwentyEight: '880189143337037874',
	};
	async function buttonHandle(id) {
		if (interaction.customId == id) {
			if (!user.roles.cache.has(id)) {
				await user.roles.add(id);
				await interaction.deferUpdate();
			}
			else {
				await user.roles.remove(id);
				await interaction.deferUpdate();
			}
		}
	}
	async function bH(array) {
		for (let i = 0; i < array.length; i += 1) {
			if (user.roles.cache.has(array[i]) && interaction.customId != array[i]) {
				// eslint-disable-next-line no-await-in-loop
				await user.roles.remove(array[i]);
			}
			else if (user.roles.cache.has(array[i]) && interaction.customId == array[i]) {
				// eslint-disable-next-line no-await-in-loop
				await user.roles.remove(array[i]);
				// eslint-disable-next-line no-await-in-loop
				await interaction.deferUpdate();
				return;
			}
			buttonHandle(array[i]);
		}
	}
	async function bHColor(array, levelRoleId, level) {
		for (let i = 0; i < array.length; i += 1) {
			if (user.roles.cache.has(array[i]) && interaction.customId != array[i]) {
				// eslint-disable-next-line no-await-in-loop
				await user.roles.remove(array[i]);
			}
			else if (user.roles.cache.has(array[i]) && interaction.customId == array[i]) {
				// eslint-disable-next-line no-await-in-loop
				await user.roles.remove(array[i]);
				// eslint-disable-next-line no-await-in-loop
				await interaction.deferUpdate();
				return;
			}
			if (interaction.customId == array[i]) {
				if (user.roles.cache.has(levelRoleId) || user.roles.cache.has(levelIds.booster) || user.roles.cache.has(levelIds.divine)) {
					if (!user.roles.cache.has(array[i])) {
						await user.roles.add(array[i]);
						await interaction.deferUpdate();
					}
					else {
						await user.roles.remove(array[i]);
						await interaction.deferUpdate();
					}
				}
				else {
					user.send(`Bunu yapabilmek için ${level} levelden yüksek olmalısın!`);
					await interaction.deferUpdate();
				}
			}
		}
	}

	// ! color controllers
	if (
		interaction.customId == colors.colorOne
		|| interaction.customId == colors.colorTwo
		|| interaction.customId == colors.colorThree
		|| interaction.customId == colors.colorFour
		|| interaction.customId == colors.colorFive
		|| interaction.customId == colors.colorSix
		|| interaction.customId == colors.colorSeven
		|| interaction.customId == colors.colorEight
		|| interaction.customId == colors.colorNine
		|| interaction.customId == colors.colorTen
		|| interaction.customId == colors.colorEleven
		|| interaction.customId == colors.colorTwelve
		|| interaction.customId == colors.colorThirteen
		|| interaction.customId == colors.colorFourteen
		|| interaction.customId == colors.colorFiveteen
		|| interaction.customId == colors.colorSixteen
		|| interaction.customId == colors.colorSeventeen
		|| interaction.customId == colors.colorEighteen
		|| interaction.customId == colors.colorNineteen
		|| interaction.customId == colors.colorTwenty
		|| interaction.customId == colors.colorTwentyOne
		|| interaction.customId == colors.colorTwentyTwo
		|| interaction.customId == colors.colorTwentyThree
		|| interaction.customId == colors.colorTwentyFour
		|| interaction.customId == colors.colorTwentyFive
		|| interaction.customId == colors.colorTwentySix
		|| interaction.customId == colors.colorTwentySeven
		|| interaction.customId == colors.colorTwentyEight
	) {
		bHColor([colors.colorOne, colors.colorTwo, colors.colorThree, colors.colorFour], levelIds.none, 0);
		bHColor([colors.colorFive, colors.colorSix, colors.colorSeven, colors.colorEight], levelIds.five, 5);
		bHColor([colors.colorNine, colors.colorTen, colors.colorEleven, colors.colorTwelve], levelIds.fiveTeen, 15);
		bHColor([colors.colorThirteen, colors.colorFourteen, colors.colorFiveteen, colors.colorSixteen], levelIds.twentyFive, 25);
		bHColor([colors.colorSeventeen, colors.colorEighteen, colors.colorNineteen, colors.colorTwenty], levelIds.thirtyFive, 35);
		bHColor([colors.colorTwentyOne, colors.colorTwentyTwo, colors.colorTwentyThree, colors.colorTwentyFour], levelIds.fourtyFive, 45);
		bHColor([colors.colorTwentyFive, colors.colorTwentySix, colors.colorTwentySeven, colors.colorTwentyEight], levelIds.fifty, 50);
	}
	const genders = {
		male: '887825563576848396',
		female: '887825555360219156',
		nonBinary: '887825569817972736',
	};
	if (
		interaction.customId == genders.male
		|| interaction.customId == genders.female
		|| interaction.customId == genders.nonBinary
	) {
		bH([genders.male, genders.female, genders.nonBinary]);
	}
	const signs = {
		Aries: '887825975516217364',
		Taurus: '887825983573463080',
		Gemini: '887825991609765909',
		Cancer: '887826024962863174',
		Leo: '887826020747603998',
		Virgo: '887826032776839178',
		Libra: '887826040586633226',
		Scorpio: '887826045842104330',
		Sagittarius: '887826054209757214',
		Capricorn: '887826050359377920',
		Aquarius: '887825998912028774',
		Pisces: '887826007300636712',
	};
	if (
		interaction.customId == signs.Aries
		|| interaction.customId == signs.Taurus
		|| interaction.customId == signs.Gemini
		|| interaction.customId == signs.Cancer
		|| interaction.customId == signs.Leo
		|| interaction.customId == signs.Virgo
		|| interaction.customId == signs.Libra
		|| interaction.customId == signs.Scorpio
		|| interaction.customId == signs.Sagittarius
		|| interaction.customId == signs.Capricorn
		|| interaction.customId == signs.Aquarius
		|| interaction.customId == signs.Pisces
	) {
		bH([signs.Aries, signs.Taurus, signs.Gemini, signs.Cancer, signs.Leo, signs.Virgo, signs.Libra, signs.Scorpio, signs.Sagittarius, signs.Capricorn, signs.Aquarius, signs.Pisces]);
	}
	// One: 13-14 ages, Two: 15-16 ages, Three: 17-18 ages, Four: 18+ ages
	const ages = {
		one: '887833135239278642',
		two: '887833201110822932',
		three: '887833293435846666',
		four: '887833320287784982',
	};
	if (
		interaction.customId == ages.one
		|| interaction.customId == ages.two
		|| interaction.customId == ages.three
		|| interaction.customId == ages.four
	) {
		bH([ages.one, ages.two, ages.three, ages.four]);
	}
	const relationship = {
		one: '887830763851116565',
		two: '887831578439471124',
		three: '887830772331991071',
		four: '887830776790548530',
	};
	if (
		interaction.customId == relationship.one
		|| interaction.customId == relationship.two
		|| interaction.customId == relationship.three
		|| interaction.customId == relationship.four
	) {
		bH([relationship.one, relationship.two, relationship.three, relationship.four]);
	}
	const games = {
		one: '887828230067851304',
		two: '887828237919596584',
		three: '887828260535296091',
		four: '887828246048178246',
		five: '887828253056860161',
		six: '887828265455210508',
	};
	if (
		interaction.customId == games.one
		|| interaction.customId == games.two
		|| interaction.customId == games.three
		|| interaction.customId == games.four
		|| interaction.customId == games.five
		|| interaction.customId == games.six
	) {
		buttonHandle(games.one);
		buttonHandle(games.two);
		buttonHandle(games.three);
		buttonHandle(games.four);
		buttonHandle(games.five);
		buttonHandle(games.six);
	}
	const hobbies = {
		one: '887834314211999774',
		two: '887834374664507443',
		three: '888201729705930804',
		four: '887834409145888858',
		five: '887834483452166204',
		six: '887834540284977163',
		seven: '887834693096058911',
		eight: '887834574808309883',
	};
	if (
		interaction.customId == hobbies.one
		|| interaction.customId == hobbies.two
		|| interaction.customId == hobbies.three
		|| interaction.customId == hobbies.four
		|| interaction.customId == hobbies.five
		|| interaction.customId == hobbies.six
		|| interaction.customId == hobbies.seven
		|| interaction.customId == hobbies.eight
	) {
		buttonHandle(hobbies.one);
		buttonHandle(hobbies.two);
		buttonHandle(hobbies.three);
		buttonHandle(hobbies.four);
		buttonHandle(hobbies.five);
		buttonHandle(hobbies.six);
		buttonHandle(hobbies.seven);
		buttonHandle(hobbies.eight);
	}

	const pingRoles = {
		one: '888843476161146880',
		two: '888843437783257229',
		three: '881955488743428156',
		four: '887823245317918760',
		five: '887822939800608788',
		six: '887823352645951528',
	};

	if (
		interaction.customId == pingRoles.one
		|| interaction.customId == pingRoles.two
		|| interaction.customId == pingRoles.three
		|| interaction.customId == pingRoles.four
		|| interaction.customId == pingRoles.five
		|| interaction.customId == pingRoles.six
	) {
		buttonHandle(pingRoles.one);
		buttonHandle(pingRoles.two);
		buttonHandle(pingRoles.three);
		buttonHandle(pingRoles.four);
		buttonHandle(pingRoles.five);
		buttonHandle(pingRoles.six);
	}
	const ayrac = {
		one: '879804829130719253',
		two: '881955632444489768',
		three: '887822674510888990',
	};
	if (
		interaction.customId == ayrac.one
		|| interaction.customId == ayrac.two
		|| interaction.customId == ayrac.three
	) {
		buttonHandle(ayrac.one);
		buttonHandle(ayrac.two);
		buttonHandle(ayrac.three);
	}
});

client.on('error', (e) => {
	console.log(e);
});
client.on('inviteCreate', async (invite) => {
	guildInvites.push({
		guildId: '879758969814515752',
		code: inv.code,
		uses: inv.uses,
		inviter: inv.inviter,
		channel: inv.channel,
	});
});

client.login(token);
