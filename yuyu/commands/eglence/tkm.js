/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { default: axios } = require('axios');


module.exports = class tkm extends Command {
	constructor(client) {
		super(client, {
			name: 'tkm',
			memberName: 'tkm',
			aliases: ['taskagitmakas', 'tmk'],
			group: 'eglence',
			description: 'Taş kağıt makas oynar.',
		});
	}

	run(message) {
		let sayi = 0;
		let durum = false;
		let post = false;
		const tkmrnd = Math.floor(Math.random() * 3);
		const tkmTwo = Math.floor(Math.random() * 7);
		async function mesaj(m1, emoji) {
			const list = [];
			let e;
			let dm = true;
			let dm1 = true;
			if (emoji == '🪨') { e = 1; }
			else if (emoji == '✂️') { e = 2; }
			else if (emoji == '🧤') { e = 3; }

			const filtertas = (reaction, user) => reaction.emoji.name === emoji && user.id === message.author.id;
			const collectortas = m1.createReactionCollector(filtertas, { time: 15000 });
			// eslint-disable-next-line no-unused-vars
			collectortas.on('collect', async (reaction, user) => {
				if (durum) {
					axios.get(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.author.id}/tkm/winsayisi.json`).then(async (response) => {
						if (response.data == null) {
							post = true;
							list.push({
								id: '', data: sayi, divine: false, rebel: false,
							});
						}
						else {
							for (const key in response.data) {
								list.push({
									id: key, data: response.data[key].sayi, divine: response.data[key].divine, rebel: response.data[key].rebel,
								});
								sayi = list[0].data;
							}
						}

						if (tkmrnd === e || tkmTwo <= 1) {
							sayi += 1;
							if (sayi < 0) {
								sayi = 0;
							}
							const embedkagit = new MessageEmbed()
								.setColor('#0250C4')
								.setTitle('❗ >> Taş Kağıt Makas Oyunu\n\n**Kazandınız!**')
								.setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
								.setImage('https://media1.tenor.com/images/a05dd2748f7817007ff1d393c06065d5/tenor.gif')
								.setDescription(`Oyun için teşekkür ederim. Eğlenceliydi, yine oyun oynamak için geri gel... Seni bekliyor olacağım oyun arkadaşım.\n\nBeni tam ${sayi} kere mağlup ettin`);
							m1.channel.send(embedkagit);
							durum = false;
						}
						else {
							sayi -= 1;
							if (sayi < 0) {
								sayi = 0;
							}
							const embedkagit = new MessageEmbed()
								.setColor('#0250C4')
								.setTitle('❗ >> Taş Kağıt Makas Oyunu\n\n**Kaybettiniz!**')
								.setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
								.setImage('https://media1.tenor.com/images/6c2243fcf5eec62d6c43e5078c30b1ca/tenor.gif')
								.setDescription(`Oyun için teşekkür ederim. Eğlenceliydi, yine oyun oynamak için geri gel... Seni bekliyor olacağım oyun arkadaşım.\n\nBeni tam ${sayi} kere mağlup ettin`);
							m1.channel.send(embedkagit);
							durum = false;
						}
						if (sayi >= 100 && !message.member.roles.cache.has('843264415569936424')) {
							const winwin = new MessageEmbed()
								.setColor('#0250C4')
								.setTitle('❗ >> Taş Kağıt Makas Oyunu')
								.setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
								.setImage('https://media1.tenor.com/images/aff48b5d06ebb76fef6e067e0e4d9fc0/tenor.gif')
								.setDescription('Tebrikler beni 100 kez mağlup ettin. Benden sana küçük bir hediye.~\n\nSunucuda ki rollerine bir göz atar mısın ? Sana gönderdiğim hediye tam orda duruyor.');
							try {
								await message.author.send(winwin);
							}
							catch {
								const dmMessage = new MessageEmbed()
									.setColor('#0250C4')
									.setTitle('❗ >> Taş Kağıt Makas Oyunu')
									.setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
									.setImage('https://media1.tenor.com/images/aff48b5d06ebb76fef6e067e0e4d9fc0/tenor.gif')
									.setDescription('Tebrikler beni 100 kez mağlup ettin. Hediyeni alabilmen için bana dm atman veya dmlerini açman, ardından beni tekrar mağlup gerekiyor...');
								await message.author.send(dmMessage);
								dm = false;
							}
							if (dm && !message.member.roles.cache.has('843264415569936424')) {
								const memberRole = message.guild.roles.cache.find((role) => role.id === '843264415569936424');
								const member = message.guild.members.cache.get(message.author.id);
								list[0].divine = true;
								await member.roles.add(memberRole);
								setTimeout(() => {
									message.author.send('Ah, demek hediyeni gördün. Umarım mutlu olmuşsundur. Ee, sonuçta beni 100 kez mağlup edip bir de benden hediye alıyorsun var mı senden daha mutlusu şuan be.');
								}, 60000);
							}
						}
						if (sayi >= 50 && !message.member.roles.cache.has('843264402928435200')) {
							const winwin = new MessageEmbed()
								.setColor('#0250C4')
								.setTitle('❗ >> Taş Kağıt Makas Oyunu')
								.setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
								.setImage('https://media1.tenor.com/images/aff48b5d06ebb76fef6e067e0e4d9fc0/tenor.gif')
								.setDescription('Tebrikler beni 50 kez mağlup ettin. Benden sana küçük bir hediye.~\n\nSunucuda ki rollerine bir göz atar mısın ? Sana gönderdiğim hediye tam orda duruyor.');
							try {
								await message.author.send(winwin);
							}
							catch {
								const winwinDm = new MessageEmbed()
									.setColor('#0250C4')
									.setTitle('❗ >> Taş Kağıt Makas Oyunu')
									.setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
									.setImage('https://media1.tenor.com/images/aff48b5d06ebb76fef6e067e0e4d9fc0/tenor.gif')
									.setDescription('Tebrikler beni 50 kez mağlup ettin. Hediyeni alabilmen için bana dm atman veya dmlerini açman, ardından beni tekrar mağlup gerekiyor...');
								await message.author.send(winwinDm);
								dm1 = false;
							}
							if (dm1 && !message.member.roles.cache.has('843264402928435200')) {
								const memberRole = message.guild.roles.cache.find((role) => role.id === '843264402928435200');
								const member = message.guild.members.cache.get(message.author.id);
								member.roles.add(memberRole);
								setTimeout(() => {
									message.author.send('Ah, demek hediyeni gördün. Umarım mutlu olmuşsundur. Ee, sonuçta beni 50 kez mağlup edip bir de benden hediye alıyorsun var mı senden daha mutlusu şuan be.');
								}, 60000);
								list[0].rebel = true;
							}
						}

						if (post) {
							await axios.post(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.author.id}/tkm/winsayisi.json`, { sayi, divine: false, rebel: false }).catch((error) => { console.log(error); });
							post = false;
						}
						else {
							await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/archa/${message.author.id}/tkm/winsayisi/${list[0].id}.json`, { sayi, divine: list[0].divine, rebel: list[0].rebel }).catch((error) => { console.log(error); });
						}
						setTimeout(() => {}, 2000);
					});
				}
			});
		}
		// TODO sıra ile tıklamasan bile çalışıyor
		if (message.channel.id == '843256402544820294' || message.channel.id == '843256484062167110' || message.channel.id == '843256511676809248' || message.channel.id == '842784398709751838') {
			if (durum == false) {
				const embed = new MessageEmbed()
					.setColor('#0250C4')
					.setTitle('❗ >> Taş Kağıt Makas Oyunu')
					.setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
					.setDescription('Demek benimle oyun oynamak istiyorsun bu senin için biraz zor olacak emin misin ?')
					.setImage('https://media1.tenor.com/images/f8539f656d2ed90be7cd3bbe95d263d2/tenor.gif')
					.setTimestamp();
				message.channel.send(embed).then(async (m) => {
					await m.react('✅');
					await m.react('❎');

					const filteryes = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;

					const collectoryes = m.createReactionCollector(filteryes, { time: 15000 });

					// eslint-disable-next-line no-unused-vars
					collectoryes.on('collect', async (reaction, user) => {
						durum = true;
						const embedYes = new MessageEmbed()
							.setColor('#0250C4')
							.setTitle('❗ >> Taş Kağıt Makas Oyunu')
							.setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
							.setImage('https://media1.tenor.com/images/fb1aa76944c156acc494fff37ebdbcfa/tenor.gif')
							.setDescription('Taş, kağıt ve makas oynayalım. Şimdi şu 3 tepkiden birisine bas. Eğer beni gerektiği kadar yenersen, seni güzel bir rolle ödüllendireceğim.');
						m.channel.send(embedYes).then(async (m1) => {
							await m1.react('🪨').then(() => m1.react('✂️')).then(() => m1.react('🧤'));

							mesaj(m1, '🪨');
							setTimeout(() => {
								mesaj(m1, '✂️');
							}, 300);
							setTimeout(() => {
								mesaj(m1, '🧤');
							}, 600);
						});
					});

					const filterno = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;

					const collectorno = m.createReactionCollector(filterno, { time: 15000 });

					// eslint-disable-next-line no-unused-vars
					collectorno.on('collect', (reaction, user) => {
						const embedno = new MessageEmbed()
							.setColor('#0250C4')
							.setTitle('❗ >> Taş Kağıt Makas Oyunu')
							.setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
							.setImage('https://media1.tenor.com/images/2b5d7bb1dd4a8e64869c33499c409582/tenor.gif')
							.setDescription('Zamanımı neden çalıyorsun defol!');

						m.channel.send(embedno);
					});
				});
			}
		}
	}
};
