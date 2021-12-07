/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
const { CommandoClient } = require('discord.js-commando');

const { MessageEmbed } = require('discord.js');

const path = require('path');

const { prefix, token } = require('./config');

const client = new CommandoClient({
	commandPrefix: prefix,
	owner: '507232669164109824',
});
/*client.dispatcher.addInhibitor((msg) => {
	if (msg.channel.id == '844374778479640577') {
		return false;
	}

	return {
		reason: 'Bunu yapabilmen için kayıt kanalında olman gerekli!',
		// eslint-disable-next-line no-unused-vars
		response: new Promise((_message) => {
			msg.say('Bunu yapabilmen için kayıt kanalında olman gerekli!').then((message) => {
				setTimeout(() => {
					msg.delete();
					message.delete();
				}, Number(3000));
			});
		}),
	};
});*/
// you return whether the command should be blocked
client.registry
	.registerDefaultTypes()
	.registerGroups([
		['register', 'Kayıt için gerekli komutlar'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		eval: false,
		prefix: false,
		commandState: false,
		help: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`${client.user.tag} Hazır!`);
	/* client.user.setActivity(`${prefix}help`, {
		type: 'LISTENING',
	}); */
	const Guilds = client.guilds.cache.map((guild) => guild.name);
	console.log(Guilds, 'Bağlandı!');
});

client.on('guildMemberAdd', (member) => {
	const guild = client.guilds.cache.get('842425040409460757');
	const channel = guild.channels.cache.get('844374778479640577');
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	let sayi = [];


	const date = `${new Date(member.user.createdAt).toLocaleString('tr-TR', options)} ${new Date(member.user.createdAt).toLocaleTimeString('tr-TR')}`;
	// + ' Saat: '+ new Date(member.user.createdAt).toLocaleTimeString('tr-TR');
	const day = Math.floor((Date.now() - new Date(member.user.createdAt)) / 60 / 60 / 24 / 1000);
	guild.members.fetch().then((m) => {
		const buyukluk = m.size.toString().split('');
		for (let i = 0; i < buyukluk.length; i += 1) {
			switch (buyukluk[i]) {
			case '0':
				sayi.push('<a:0_:845316219858452510>');
				break;
			case '1':
				sayi.push('<a:1_:845316220056240158>');
				break;
			case '2':
				sayi.push('<a:2_:845316252003598347>');
				break;
			case '3':
				sayi.push('<a:3_:845316281989464084>');
				break;
			case '4':
				sayi.push('<a:4_:845316284987605043>');
				break;
			case '5':
				sayi.push('<a:5_:845316285037281360>');
				break;
			case '6':
				sayi.push('<a:6_:845316285154852870>');
				break;
			case '7':
				sayi.push('<a:7_:845316284526362684>');
				break;
			case '8':
				sayi.push('<a:8_:845316285058646016>');
				break;
			case '9':
				sayi.push('<a:9_:845316285566681099>');
				break;
			// no default
			}
		}
		sayi = sayi.join('');
		// console.log(m)
		const embed = new MessageEmbed()
			.setTitle(`${guild.name} \n Sunucusuna Hoş Geldin!<a:wrabbit_parti:842889607469465640><a:wrabbit_parti:842889607469465640><a:wrabbit_parti:842889607469465640>`)
		// .setAuthor(client.user.username, "https://cdn.discordapp.com/avatars/842430707599015957/87590db1c04e0ceb5335cd7f967ed95b.png?size=128")
			.setColor('#030303')
			.setDescription(`<@${member.user.id}>, \nseninle şuan tam ${sayi} kişiyiz.\n\n**<@&842434546652676107> rolünü kazanmak için** \`Ses Teyit\` **Kanallarına Girerek Ses Teyidi Verebilirsin.\n\n Eğer ses teyit vermek istemiyorsan sorun değil, eğer istiyorsan seni normal bir şekilde kayıt edebiliriz. ^-^ **\n\n<@&844372994385117195> Rolüne Sahip Kişiler Seninle ilgilenecektir. \n\nEğer yetkili kısa süre içinde gelmezse buraya gelmen şerefine bir iki kere kadeh kaldıralım !<a:campaii:845316852532117565> \n\n**Hesap bilgileri;**\n**Hesap Kuruluş Tarihi: ${date} (${day} gün)**\n**Hesap: **\`${day > 15 ? 'Güvenli' : 'Tehlikeli'}\``)
		// .setImage("https://media.discordapp.net/attachments/842432330789552129/845250862800175134/IMG_20210521_134459.jpg")
			.setThumbnail('https://i.hizliresim.com/srxe7cx.gif')
			.setTimestamp();
		channel.send('<@&844372994385117195> yeni üyemizi kayıt et.', { embed });
		member.roles.add('843289751935254568');
	});
});

client.on('error', console.error);

client.login(token);
