/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
require('dotenv').config();
const { CommandoClient } = require('discord.js-commando');
const { Collection, Structures, MessageEmbed } = require('discord.js');
const path = require('path');
const { default: axios } = require('axios');
// eslint-disable-next-line camelcase
const { prefix, token, discord_owner_id } = require('./config.json');
// const db = require('quick.db');
// const Canvas = require('canvas');
// !load fonts


const guildInvites = new Collection();
require('events').EventEmitter.defaultMaxListeners = Infinity;
// todo reset timer
// mesaj sayısı = 50
Structures.extend('Guild', (Guild) => {
	class MusicGuild extends Guild {
		constructor(client, data) {
			super(client, data);
			this.musicData = {
				queue: [],
				queueHistory: [],
				isPlaying: false,
				nowPlaying: null,
				songDispatcher: null,
				// eslint-disable-next-line no-inline-comments
				skipTimer: false, // only skip if user used leave command
				loopSong: false,
				loopQueue: false,
				volume: 1,
			};
			this.triviaData = {
				isTriviaRunning: false,
				wasTriviaEndCalled: false,
				triviaQueue: [],
				triviaScore: new Map(),
			};
		}

		resetMusicDataOnError() {
			this.musicData.queue.length = 0;
			this.musicData.isPlaying = false;
			this.musicData.nowPlaying = null;
			this.musicData.loopSong = false;
			this.musicData.loopQueue = false;
			this.musicData.songDispatcher = null;
		}
	}
	return MusicGuild;
});

const client = new CommandoClient({
	commandPrefix: prefix,
	owner: discord_owner_id,
});
require('discord-buttons')(client);

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['music', ':notes: Müzik komutu grubu:'],
		['eglence', ':candy: Eğlence için komut grubu:'],
		['seviye', ':candy: Seviye ile alakalı komutlar:'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		eval: false,
		prefix: false,
		commandState: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`${client.user.tag} is Ready!`);
	client.user.setActivity(`${prefix}help`, {
		type: 'WATCHING',
	}).then((presence) => console.log(`Activity set to ${presence.activities[0].name}`))
		.catch(console.error);
	// !invite controller
	client.invites = guildInvites;
	for (const guild of client.guilds.cache.values()) {
		// Here we are getting all invites for the guild
		// Using our client.invites collection we created,
		// we are saving all invites to the cache by guild id.
		guild.fetchInvites()
			.then((invite) => client.invites.set(guild.id, invite))
			.catch((error) => console.log(error));
	}
	const Guilds = client.guilds.cache.map((guild) => guild.name);
	// eslint-disable-next-line max-len
	// const userdata = db.prepare("SELECT userdata.sayi, userdata.id, userdata.level FROM userdata ORDER BY 'userdata.level', 'userdata.sayi' DESC")
	// for (const usr of userdata.iterate()) {
	//		console.log(usr)
	// }
	console.log(Guilds, 'Bağlandı!');
});

// i dont want set this variable in every message so i set this variable without message event
const levelUpNumber = 56;

// that event for levelling
client.on('message', async (message) => {
	if (message.guild != null) {
		if (!message.member.user.bot) {
			const guild = client.guilds.cache.get('842425040409460757');
			const channel = guild.channels.cache.get('842770355071877140');

			axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/mesajsayisi/${message.member.id}.json`).then(async (response) => {
				let user = {};
				if (response.data == null) {
					await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/mesajsayisi/${message.member.id}.json`, { sayi: 1, level: 1 });
					user = {
						sayi: 1,
						level: 1,
					};
				}
				else {
					user = {
						sayi: response.data.sayi,
						level: response.data.level,
					};
				}
				user.sayi += 1;
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/mesajsayisi/${message.member.id}.json`, { sayi: user.sayi, level: user.level });


				const levelUpCoefficientOne = levelUpNumber + (levelUpNumber * user.level) + (user.level * levelUpNumber * 0.5);
				if (user.sayi >= levelUpCoefficientOne) {
					user.sayi -= levelUpCoefficientOne;
					if (user.sayi < 0) {
						user.sayi = 1;
					}

					user.level += 1;

					const embed = new MessageEmbed()
						.setTitle('Tebrikler Level Atladınız!!!')
						.setColor('#000000')
						.setDescription(`**Tebrikler** <@${message.member.id}> **Seviye** atladın.\n\nYeni Seviyen: ${user.level}`)
						.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

					channel.send(`<@${message.member.id}>`, { embed });

					await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/mesajsayisi/${message.member.id}.json`, { sayi: user.sayi, level: user.level });
					if (user.level >= 5 && !message.member.roles.cache.has('847825122382577684')) {
						await message.member.roles.add('847825122382577684');
					}
					if (user.level >= 15 && !message.member.roles.cache.has('847825216997425182')) {
						await message.member.roles.add('847825216997425182');
						const fiveTenLevel = new MessageEmbed()
							.setTitle('Tebrikler 15 Levele Ulaştınız!!!')
							.setColor('#000000')
							.setDescription(`**Tebrikler** <@${message.member.id}> **15 Level**e ulaştın.`)
							.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

						channel.send(`<@${message.member.id}>`, { embed: fiveTenLevel });
					}
					if (user.level >= 25 && !message.member.roles.cache.has('847825224414396446')) {
						await message.member.roles.add('847825224414396446');
						const twentyFiveLevel = new MessageEmbed()
							.setTitle('Tebrikler 25 Levele Ulaştınız!!!')
							.setColor('#000000')
							.setDescription(`**Tebrikler** <@${message.member.id}> **25 Level**e ulaştın.`)
							.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

						channel.send(`<@${message.member.id}>`, { embed: twentyFiveLevel });
					}
					if (user.level >= 35 && !message.member.roles.cache.has('847825241148882984')) {
						await message.member.roles.add('847825241148882984');
						const thirtyFiveLevel = new MessageEmbed()
							.setTitle('Tebrikler 35 Levele Ulaştınız!!!')
							.setColor('#000000')
							.setDescription(`**Tebrikler** <@${message.member.id}> **35 Level**e ulaştın.`)
							.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

						channel.send(`<@${message.member.id}>`, { embed: thirtyFiveLevel });
					}
					if (user.level >= 45 && !message.member.roles.cache.has('847825224414396446')) {
						await message.member.roles.add('847825224414396446');
						const fourtyFiveLevel = new MessageEmbed()
							.setTitle('Tebrikler 45 Levele Ulaştınız!!!')
							.setColor('#000000')
							.setDescription(`**Tebrikler** <@${message.member.id}> **45 Level**e ulaştın.`)
							.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

						channel.send(`<@${message.member.id}>`, { embed: fourtyFiveLevel });
					}
				}
			});
		}
	}
});

// that event for other purposes
client.on('message', async (message) => {
	if (message.content.toLowerCase() === 'sa') {
		const r = Math.round(Math.random());

		if (r == 1) {
			message.channel.send('Ah, demek buraya kadar geldin. Bir de güzel ellerinle selam mı verdin? Yazdığın selamı almamak ayıp olur şimdi.\n\nAleyküm selam. Hoş geldin güzel insan.');
		}
		else {
			message.channel.send('Sessizlik her zaman güzeldir. Fakat, senin adım atıp verdiğin selam sessizlikten daha güzel. Verdiğin selamın huzurunu hissedebiliyorum...\n\nAleyküm selam, biz de seni bekliyorduk güzel insan.');
		}

		message.react('🖤');
	}
	/* let partner = false;
	const messageArray = message.content.toLowerCase().split(' ');
	for (let x = 0; x < messageArray.length; x += 1) {
		if (messageArray[x] == 'partner') {
			partner = true;
		}
	} */
	if (message.content.startsWith() == 'partner dm') {
		try {
			message.member.send('İşte sunucumuzun texti;');
			message.member.send('»»————-————-——-——--——-——-　♡　————-——-——-—-——-——-———-««\n\n₊˚`🌈 ❜ ꒰ WhiteRabbit sunucusuna katılmaya ne dersin? ⨯ ⊹.˚ ❀\n\n━ Selam,İzin verirsen seni biraz sunucumuz hakkında bilgilendirmek istiyorum.\n\n₊˚✧˚Samimi bir sunucu ortamında güzel arkadaşlar edinme fırsatı.\n\n₊˚✦˚Level atladıkça kazanabileceğiniz güzel renk rolleri.\n\n₊˚✧˚İlgili yetkililerimizle yalnızlık çekmeyeceğiniz bir ortam.\n\n₊˚✦˚Anime ve Manga sohbeti.\n\n₊˚✧˚Sadece anime değil! Oyunlar hakkında da konuşabileceğin bir sunucu,\n\n₊˚✦˚Seni de aramızda görmekten mutluluk duyarız !\n\n‿︵‿︵‿︵‿︵‿︵‿︵ʚ˚̣̣̣ɞ・❉・ ʚ˚̣̣̣ɞ‿︵‿︵‿︵‿︵‿︵‿︵\n\n  *　　　˚　　　.*　　　.　　　　✦　*　　　　　  　　　 *\n 　　　　　.　✦　　　　　　 　*　 　˚　　　　　　✦ \n 　 　 　 .*　　　 ✦　.　　　　*　　   .\n.・。.・゜✭・.・✫・゜・。..・。.・゜✭・.・✫・゜・。.･ﾟ✧･ﾟ✭˚･ﾟ✧*\n\n➺ Ayraç: https://cdn.discordapp.com/attachments/697145772801785876/852658255842115614/2306_GlowingPurpleLine.gif\n➺ Gif: https://pa1.narvii.com/5817/a262379cbba166a5620fa89b0b491daafd36331d_hq.gif\n➺ Müzik Listemiz: https://open.spotify.com/playlist/3oYlenTCtYhC91Z5HMMrzy?si=YkKG6UA4TQi_n4nGgOqxJw&utm_source=copy-link&dl_branch=1\n➺ Giriş Biletin: https://discord.gg/He4QN6Xjht\n➺ Etiketler: @everyone & @here');
			message.channel.send(`<@${message.member.user.id}>, sana textimizi attım. Senin yapacağın şey ise#oto partner e textini atman. ^-^ <3`)
				// eslint-disable-next-line func-names, prefer-arrow-callback, max-statements-per-line
				.then(function(msg) { client.setTimeout(function() { msg.delete(); message.delete(); }, Number(10000)); });
		}
		catch {
			message.channel.send('Görünüşe göre dm\'ini kapatmışsın sana sunucumuzun textini gönderebilmem için dm\'ini açman gerekiyor.')
			// eslint-disable-next-line func-names, prefer-arrow-callback, max-statements-per-line
				.then(function(msg) { client.setTimeout(function() { msg.delete(); message.delete(); }, Number(10000)); });
		}
	}

	if (message.channel.id == '852997723858010123') {
		const partnerChannel = message.guild.channels.cache.find((channel) => channel.id === '853016793885835284');
		await partnerChannel.send(message.content);
		message.delete();
	}
});

client.on('guildMemberAdd', async (member) => {
	// !invite controller
	// TODO davet takip db

	const cachedInvites = client.invites.get(member.guild.id);

	const newInvites = await member.guild.fetchInvites();
	client.invites.set(member.guild.id, newInvites);

	const usedInvite = newInvites.find((invite) => cachedInvites.get(invite.code).uses < invite.uses);

	const logChannel = member.guild.channels.cache.find((channel) => channel.id === '843293065376301086');

	const channelOne = member.guild.channels.cache.find((channel) => channel.id === '842769865411919923');

	const embedOne = new MessageEmbed()
		.setColor('#000000')
		.setDescription(`**<@${member.user.id}> Aramıza katıldı, Hoş geldin güzel insan ^^**`)
		.setImage('https://i.pinimg.com/originals/7a/d4/15/7ad41519eace29dfc391e5ce5e775b2d.gif')
		.setTimestamp();
	channelOne.send(embedOne);

	if (!logChannel) return;
	// member.user bizim gelen userimiz
	// inviter bizim davet eden adamımız
	// eslint-disable-next-line no-unused-vars
	const { uses, inviter, channel } = usedInvite;


	axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/kayitlar.json').then(async (response) => {
		const list = [];
		let kayitEdildi = false;
		let kayitSayisi = 0;
		let kayitEdenId = 0;
		let post = false;

		if (response.data == null) {
			post = true;
			list.push();
		}
		else {
			for (const key in response.data) {
				// eslint-disable-next-line no-inline-comments
				list.push({ /* id: key, */ kayitEdenId: response.data[key].kayitEdenId, kayitEdilenId: response.data[key].kayitEdilenId });
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
				.setDescription(`${'**Bilgi: Yeni Üye!!**'
              // `➤ **Code:** ${code}`,
              + '\n➤ **Bu kişi zaten** <@'}${kayitEdenId}> **Tarafından davet edilmişti.. Davet sayınız artmayacak!**\n${[
					`  ➤ **Davet Şu Kişi Tarafından Oluşturuldu:** ${inviter.tag}`,
					`  ➤ **Davet Şu Kadar Kullanıldı:** ${kayitSayisi}`,
					`➤ **Şu Kanala Gönderildi:** ${channel}`,
				].join('\n')}`)
				.setColor('#000000')
				.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

			logChannel.send(embed);
		}
		else {
			kayitSayisi += 1;

			const embed = new MessageEmbed()
				.setAuthor(`${member.user.tag} Katıldı!`, member.user.displayAvatarURL())
				.addField('Bilgi: Yeni Üye!!', [
					// `➤ **Code:** ${code}`,
					`  ➤ **Davet Şu Kişi Tarafından Oluşturuldu:** ${inviter.tag}`,
					`  ➤ **Davet Şu Kadar Kullanıldı:** ${kayitSayisi}`,
					`➤ **Şu Kanala Gönderildi:** ${channel}`,
				].join('\n'))
				.setColor('#000000')
				.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

			logChannel.send(embed);

			axios.post('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/kayitlar.json', { kayitEdenId: inviter.id, kayitEdilenId: member.user.id });
		}
	});
	// buraya daha önce kayıt edildiyse girecek burda bir post işlemi olmayacak zaten kayıtlı olduğu için
});

client.on('guildMemberRemove', (member) => {
	const guild = client.guilds.cache.get('842425040409460757');
	const channel = guild.channels.cache.get('842769865411919923');

	const embed = new MessageEmbed()
		.setColor('#000000')
		.setDescription(`${member.user.username}#${member.user.discriminator} Aramızdan ayrıldı kendine iyi bak...`)
		.setImage('https://i.pinimg.com/originals/84/41/3d/84413d97a395ecd36d88c61aed20be6f.gif')
		.setTimestamp();

	channel.send({ embed });
});


client.on('voiceStateUpdate', async (___, newState) => {
	if (
		newState.member.user.bot
    && !newState.channelID
    && newState.guild.musicData.songDispatcher
    && newState.member.user.id == client.user.id
	) {
		// newState.guild.musicData.queue.length = 0;
		newState.guild.musicData.songDispatcher.end();
		return;
	}
	if (
		newState.member.user.bot
    && newState.channelID
    && newState.member.user.id == client.user.id
    && !newState.selfDeaf
	) {
		await newState.setSelfDeaf(true);
	}
});

client.on('clickButton', async (button) => {
	// !BUG send dm
	const guild = client.guilds.cache.get('842425040409460757');
	const user = await guild.members.cache.get(button.clicker.user.id);

	const levelIds = {
		five: '847825122382577684',
		fiveTeen: '847825216997425182',
		twentyFive: '847825224414396446',
		thirtyFive: '847825241148882984',
		fourtyFive: '847825243988819969',
		booster: '846383734823059497',
	};

	const colors = {
		colorOne: '844566836921368685',
		colorTwo: '844567028043350096',
		colorThree: '844567032661671946',
		colorFour: '844567058724683806',
		colorFive: '844567047118651432',
		colorSix: '844567036171780126',
		colorSeven: '844567052991201290',
		colorEight: '844567328955301889',
		colorNine: '844567049900785674',
		colorTen: '844567056086597652',
		colorEleven: '848885428261486592',
		colorTwelve: '848885470545182720',
		colorThirteen: '848885853342138378',
		colorFourteen: '848885461774106646',
		colorFiveteen: '848885850099810365',
		colorSixteen: '849816091499954276',
		colorSeventeen: '848885451615633409',
		colorEighteen: '849816082918146048',
		colorNineteen: '849816079857483806',
		colorTwenty: '849816085494235207',
		colorTwentyOne: '848885843358646302',
		colorTwentyTwo: '848885849017024522',
		colorTwentyThree: '849816088514396201',
		colorTwentyFour: '848885479566213172',
		colorTwentyFive: '848885834232234024',
	};

	// ! Color handler function
	async function buttonColorHandle(levelRoleId, colorRoleId, level) {
		if (user.roles.cache.has(levelRoleId) || user.roles.cache.has(levelIds.booster)) {
			if (!user.roles.cache.has(colorRoleId)) {
				await user.roles.add(colorRoleId);
				await button.defer();
			}
			else {
				await user.roles.remove(colorRoleId);
				await button.defer();
			}
		}
		else {
			user.send(`Bunu yapabilmek için ${level} levelden yüksek olmalısın!`);
			await button.defer();
		}
	}
	async function buttonHandle(id) {
		if (button.id == id) {
			if (!user.roles.cache.has(id)) {
				await user.roles.add(id);
				await button.defer();
			}
			else {
				await user.roles.remove(id);
				await button.defer();
			}
		}
	}

	// ! color controllers
	if (
		button.id == colors.colorOne
		|| button.id == colors.colorTwo
		|| button.id == colors.colorThree
		|| button.id == colors.colorFour
		|| button.id == colors.colorFive
		|| button.id == colors.colorSix
		|| button.id == colors.colorSeven
		|| button.id == colors.colorEight
		|| button.id == colors.colorNine
		|| button.id == colors.colorTen
		|| button.id == colors.colorEleven
		|| button.id == colors.colorTwelve
		|| button.id == colors.colorThirteen
		|| button.id == colors.colorFourteen
		|| button.id == colors.colorFiveteen
		|| button.id == colors.colorSixteen
		|| button.id == colors.colorSeventeen
		|| button.id == colors.colorEighteen
		|| button.id == colors.colorNineteen
		|| button.id == colors.colorTwenty
		|| button.id == colors.colorTwentyOne
		|| button.id == colors.colorTwentyTwo
		|| button.id == colors.colorTwentyThree
		|| button.id == colors.colorTwentyFour
		|| button.id == colors.colorTwentyFive
	) {
		if (user.roles.cache.has(colors.colorOne)) {
			await user.roles.remove(colors.colorOne);
		}
		if (user.roles.cache.has(colors.colorTwo)) {
			await user.roles.remove(colors.colorTwo);
		}
		if (user.roles.cache.has(colors.colorThree)) {
			await user.roles.remove(colors.colorThree);
		}
		if (user.roles.cache.has(colors.colorFour)) {
			await user.roles.remove(colors.colorFour);
		}
		if (user.roles.cache.has(colors.colorFive)) {
			await user.roles.remove(colors.colorFive);
		}
		if (user.roles.cache.has(colors.colorSix)) {
			await user.roles.remove(colors.colorSix);
		}
		if (user.roles.cache.has(colors.colorSeven)) {
			await user.roles.remove(colors.colorSeven);
		}
		if (user.roles.cache.has(colors.colorEight)) {
			await user.roles.remove(colors.colorEight);
		}
		if (user.roles.cache.has(colors.colorNine)) {
			await user.roles.remove(colors.colorNine);
		}
		if (user.roles.cache.has(colors.colorTen)) {
			await user.roles.remove(colors.colorTen);
		}
		if (user.roles.cache.has(colors.colorEleven)) {
			await user.roles.remove(colors.colorEleven);
		}
		if (user.roles.cache.has(colors.colorTwelve)) {
			await user.roles.remove(colors.colorTwelve);
		}
		if (user.roles.cache.has(colors.colorThirteen)) {
			await user.roles.remove(colors.colorThirteen);
		}
		if (user.roles.cache.has(colors.colorFourteen)) {
			await user.roles.remove(colors.colorFourteen);
		}
		if (user.roles.cache.has(colors.colorFiveteen)) {
			await user.roles.remove(colors.colorFiveteen);
		}
		if (user.roles.cache.has(colors.colorSixteen)) {
			await user.roles.remove(colors.colorSixteen);
		}
		if (user.roles.cache.has(colors.colorSeventeen)) {
			await user.roles.remove(colors.colorSeventeen);
		}
		if (user.roles.cache.has(colors.colorEighteen)) {
			await user.roles.remove(colors.colorEighteen);
		}
		if (user.roles.cache.has(colors.colorNineteen)) {
			await user.roles.remove(colors.colorNineteen);
		}
		if (user.roles.cache.has(colors.colorTwenty)) {
			await user.roles.remove(colors.colorTwenty);
		}
		if (user.roles.cache.has(colors.colorTwentyOne)) {
			await user.roles.remove(colors.colorTwentyOne);
		}
		if (user.roles.cache.has(colors.colorTwentyTwo)) {
			await user.roles.remove(colors.colorTwentyTwo);
		}
		if (user.roles.cache.has(colors.colorTwentyThree)) {
			await user.roles.remove(colors.colorTwentyThree);
		}
		if (user.roles.cache.has(colors.colorTwentyFour)) {
			await user.roles.remove(colors.colorTwentyFour);
		}
		if (user.roles.cache.has(colors.colorTwentyFive)) {
			await user.roles.remove(colors.colorTwentyFive);
		}
		if (button.id == colors.colorOne) {
			buttonColorHandle(levelIds.five, colors.colorOne, 5);
		}
		// 2
		else if (button.id == colors.colorTwo) {
			buttonColorHandle(levelIds.five, colors.colorTwo, 5);
		}
		// 3
		else if (button.id == colors.colorThree) {
			buttonColorHandle(levelIds.five, colors.colorThree, 5);
		}
		// 4
		else if (button.id == colors.colorFour) {
			buttonColorHandle(levelIds.five, colors.colorFour, 5);
		}
		// 5
		else if (button.id == colors.colorFive) {
			buttonColorHandle(levelIds.five, colors.colorFive, 5);
		}
		// 6
		else if (button.id == colors.colorSix) {
			buttonColorHandle(levelIds.fiveTeen, colors.colorSix, 15);
		}
		// 7
		else if (button.id == colors.colorSeven) {
			buttonColorHandle(levelIds.fiveTeen, colors.colorSeven, 15);
		}
		// 8
		else if (button.id == colors.colorEight) {
			buttonColorHandle(levelIds.fiveTeen, colors.colorEight, 15);
		}
		// 9
		else if (button.id == colors.colorNine) {
			buttonColorHandle(levelIds.fiveTeen, colors.colorNine, 15);
		}
		// 10
		else if (button.id == colors.colorTen) {
			buttonColorHandle(levelIds.fiveTeen, colors.colorTen, 15);
		}
		// 11
		else if (button.id == colors.colorEleven) {
			buttonColorHandle(levelIds.twentyFive, colors.colorEleven, 25);
		}
		// 12
		else if (button.id == colors.colorTwelve) {
			buttonColorHandle(levelIds.twentyFive, colors.colorTwelve, 25);
		}
		// 13
		else if (button.id == colors.colorThirteen) {
			buttonColorHandle(levelIds.twentyFive, colors.colorThirteen, 25);
		}
		// 14
		else if (button.id == colors.colorFourteen) {
			buttonColorHandle(levelIds.twentyFive, colors.colorFourteen, 25);
		}
		// 15
		else if (button.id == colors.colorFiveteen) {
			buttonColorHandle(levelIds.twentyFive, colors.colorFiveteen, 25);
		}
		// 16
		else if (button.id == colors.colorSixteen) {
			buttonColorHandle(levelIds.thirtyFive, colors.colorSixteen, 35);
		}
		// 17
		else if (button.id == colors.colorSeventeen) {
			buttonColorHandle(levelIds.thirtyFive, colors.colorSeventeen, 35);
		}
		// 18
		else if (button.id == colors.colorEighteen) {
			buttonColorHandle(levelIds.thirtyFive, colors.colorEighteen, 35);
		}
		// 19
		else if (button.id == colors.colorNineteen) {
			buttonColorHandle(levelIds.thirtyFive, colors.colorNineteen, 35);
		}
		// 20
		else if (button.id == colors.colorTwenty) {
			buttonColorHandle(levelIds.thirtyFive, colors.colorTwenty, 35);
		}
		// 21
		else if (button.id == colors.colorTwentyOne) {
			buttonColorHandle(levelIds.fourtyFive, colors.colorTwentyOne, 45);
		}
		// 22
		else if (button.id == colors.colorTwentyTwo) {
			buttonColorHandle(levelIds.fourtyFive, colors.colorTwentyTwo, 45);
		}
		// 23
		else if (button.id == colors.colorTwentyThree) {
			buttonColorHandle(levelIds.fourtyFive, colors.colorTwentyThree, 45);
		}
		// 24
		else if (button.id == colors.colorTwentyFour) {
			buttonColorHandle(levelIds.fourtyFive, colors.colorTwentyFour, 45);
		}
		// 25
		else if (button.id == colors.colorTwentyFive) {
			buttonColorHandle(levelIds.fourtyFive, colors.colorTwentyFive, 45);
		}
	}

	// cinsiyet
	if (button.id == '848880380287254569' || button.id == '848880376118378517' || button.id == '848883381139537922') {
		if (user.roles.cache.has('848880380287254569')) {
			await user.roles.remove('848880380287254569');
		}
		if (user.roles.cache.has('848880376118378517')) {
			await user.roles.remove('848880376118378517');
		}
		if (user.roles.cache.has('848883381139537922')) {
			await user.roles.remove('848883381139537922');
		}
		if (button.id == '848880380287254569') {
			if (!user.roles.cache.has('848880380287254569')) {
				await user.roles.add('848880380287254569');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '848880376118378517') {
			if (!user.roles.cache.has('848880376118378517')) {
				await user.roles.add('848880376118378517');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '848883381139537922') {
			if (!user.roles.cache.has('848883381139537922')) {
				await user.roles.add('848883381139537922');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
	}

	// burçlar
	else if (
		button.id == '850097869373440021'
  || button.id == '850097977720569877'
  || button.id == '850098020371791933'
  || button.id == '850098122784112660'
  || button.id == '850098170335723600'
  || button.id == '850098211023618098'
  || button.id == '850098253847330846'
  || button.id == '850098300115484702'
  || button.id == '850098341269995530'
  || button.id == '850098389226881046'
  || button.id == '850098615716413508'
  || button.id == '850098653019373658'
	) {
		if (user.roles.cache.has('850097869373440021')) {
			await user.roles.remove('850097869373440021');
		}
		if (user.roles.cache.has('850097977720569877')) {
			await user.roles.remove('850097977720569877');
		}
		if (user.roles.cache.has('850098020371791933')) {
			await user.roles.remove('850098020371791933');
		}
		if (user.roles.cache.has('850098122784112660')) {
			await user.roles.remove('850098122784112660');
		}
		if (user.roles.cache.has('850098170335723600')) {
			await user.roles.remove('850098170335723600');
		}
		if (user.roles.cache.has('850098211023618098')) {
			await user.roles.remove('850098211023618098');
		}
		if (user.roles.cache.has('850098253847330846')) {
			await user.roles.remove('850098253847330846');
		}
		if (user.roles.cache.has('850098300115484702')) {
			await user.roles.remove('850098300115484702');
		}
		if (user.roles.cache.has('850098341269995530')) {
			await user.roles.remove('850098341269995530');
		}
		if (user.roles.cache.has('850098389226881046')) {
			await user.roles.remove('850098389226881046');
		}
		if (user.roles.cache.has('850098615716413508')) {
			await user.roles.remove('850098615716413508');
		}
		if (user.roles.cache.has('850098653019373658')) {
			await user.roles.remove('850098653019373658');
		}


		if (button.id == '850097869373440021') {
			if (!user.roles.cache.has('850097869373440021')) {
				await user.roles.add('850097869373440021');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850097977720569877') {
			if (!user.roles.cache.has('850097977720569877')) {
				await user.roles.add('850097977720569877');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098020371791933') {
			if (!user.roles.cache.has('850098020371791933')) {
				await user.roles.add('850098020371791933');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098122784112660') {
			if (!user.roles.cache.has('850098122784112660')) {
				await user.roles.add('850098122784112660');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098170335723600') {
			if (!user.roles.cache.has('850098170335723600')) {
				await user.roles.add('850098170335723600');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098211023618098') {
			if (!user.roles.cache.has('850098211023618098')) {
				await user.roles.add('850098211023618098');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098253847330846') {
			if (!user.roles.cache.has('850098253847330846')) {
				await user.roles.add('850098253847330846');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098300115484702') {
			if (!user.roles.cache.has('850098300115484702')) {
				await user.roles.add('850098300115484702');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098341269995530') {
			if (!user.roles.cache.has('850098341269995530')) {
				await user.roles.add('850098341269995530');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098389226881046') {
			if (!user.roles.cache.has('850098389226881046')) {
				await user.roles.add('850098389226881046');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098615716413508') {
			if (!user.roles.cache.has('850098615716413508')) {
				await user.roles.add('850098615716413508');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850098653019373658') {
			if (!user.roles.cache.has('850098653019373658')) {
				await user.roles.add('850098653019373658');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
	}
	// oyunlar
	buttonHandle('848881879528505394');
	buttonHandle('848881951070093322');
	buttonHandle('848882026664296458');
	buttonHandle('848882081681375262');
	buttonHandle('848882222223851530');
	buttonHandle('848882288187146250');

	// İlişki Durumu
	if (button.id == '850185570256683018' || button.id == '850185493006385192' || button.id == '850185090457796618' || button.id == '850185003299504138') {
		if (user.roles.cache.has('850185570256683018')) {
			await user.roles.remove('850185570256683018');
		}
		if (user.roles.cache.has('850185493006385192')) {
			await user.roles.remove('850185493006385192');
		}
		if (user.roles.cache.has('850185090457796618')) {
			await user.roles.remove('850185090457796618');
		}
		if (user.roles.cache.has('850185003299504138')) {
			await user.roles.remove('850185003299504138');
		}


		if (button.id == '850185570256683018') {
			if (!user.roles.cache.has('850185570256683018')) {
				await user.roles.add('850185570256683018');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850185493006385192') {
			if (!user.roles.cache.has('850185493006385192')) {
				await user.roles.add('850185493006385192');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850185090457796618') {
			if (!user.roles.cache.has('850185090457796618')) {
				await user.roles.add('850185090457796618');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850185003299504138') {
			if (!user.roles.cache.has('850185003299504138')) {
				await user.roles.add('850185003299504138');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
	}
	// yaş
	else if (button.id == '850187481521586197' || button.id == '850187571463323649' || button.id == '850187621090328596' || button.id == '850187679738888213') {
		if (user.roles.cache.has('850187481521586197')) {
			await user.roles.remove('850187481521586197');
		}
		if (user.roles.cache.has('850187571463323649')) {
			await user.roles.remove('850187571463323649');
		}
		if (user.roles.cache.has('850187621090328596')) {
			await user.roles.remove('850187621090328596');
		}
		if (user.roles.cache.has('850187679738888213')) {
			await user.roles.remove('850187679738888213');
		}
		if (button.id == '850187481521586197') {
			if (!user.roles.cache.has('850187481521586197')) {
				await user.roles.add('850187481521586197');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850187571463323649') {
			if (!user.roles.cache.has('850187571463323649')) {
				await user.roles.add('850187571463323649');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850187621090328596') {
			if (!user.roles.cache.has('850187621090328596')) {
				await user.roles.add('850187621090328596');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
		if (button.id == '850187679738888213') {
			if (!user.roles.cache.has('850187679738888213')) {
				await user.roles.add('850187679738888213');
				await button.defer();
			}
			else {
				await button.defer();
			}
		}
	}
	// hobi
	buttonHandle('852179483821998110');
	buttonHandle('852179474320982036');
	buttonHandle('852179453849108540');
	buttonHandle('852180422891667467');
	buttonHandle('852180417036812318');
	buttonHandle('852180420187783219');
	buttonHandle('852179480562106378');
	buttonHandle('852179477181235200');

	// partner
	buttonHandle('852671121027104778');
});

client.on('inviteCreate', async (invite) => {
	client.invites.set(invite.guild.id, await invite.guild.fetchInvites());
});

client.login(token);
