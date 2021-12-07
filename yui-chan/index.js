/* eslint-disable no-tabs */
const { default: axios } = require('axios');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const config = require('./config');
const functions = require('./functions');

global.guildData = {};
global.initialized = false;

const client = new CommandoClient({
	commandPrefix: config.prefix,
	owner: '507232669164109824',
	invite: 'https://discord.gg/aoshima',
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['general', 'Genel komutlar grubu her komutu yanına bir şey eklemeden çağırabilirsiniz, bu işlem komut hakkındaki bilgileri gösterir.'],
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
	await axios.get('https://yuna-chan-default-rtdb.firebaseio.com/.json').then(async (response) => {
		if (response.data == null) {
			global.guildData.push('rastgele');
		}
		else {
			// eslint-disable-next-line guard-for-in, no-restricted-syntax
			for (const key in response.data) {
				global.guildData[response.data[key].id] = {
					id: response.data[key].id,
					name: response.data[key].name,
					sansmesaji: {
						channelID: response.data[key].sansmesaji.channelID,
						durum: response.data[key].sansmesaji.durum,
						liste: Object.values(response.data[key].sansmesaji.liste),
						degistirilmeSayisi: 0,
						sayi: response.data[key].sansmesaji.sayi,
						mesajSayisi: 0,
					},
					hosgeldinmesaji: {
						channelID: response.data[key].hosgeldinmesaji.channelID,
						durum: response.data[key].hosgeldinmesaji.durum,
						mesaj: response.data[key].hosgeldinmesaji.mesaj,
						degistirilmeSayisi: 0,
					},
					sifirSifirMesaji: {
						channelID: response.data[key].sifirSifirMesaji.channelID,
						durum: response.data[key].sifirSifirMesaji.durum,
						mesaj: response.data[key].sifirSifirMesaji.mesaj,
						degistirilmeSayisi: 0,
					},
				};
				if (response.data[key].sifirSifirMesaji.durum) {
					functions.timeout(client,
						global.guildData[response.data[key].id].id,
						global.guildData[response.data[key].id].sifirSifirMesaji.channelID,
						global.guildData[response.data[key].id].sifirSifirMesaji.mesaj,
						global.guildData[response.data[key].id].sifirSifirMesaji.degistirilmeSayisi);
				}
			}
			global.initialized = true;
		}
	});
	console.log(`${client.user.tag} Hazır!`);
	client.user.setActivity('Yuna 💗 Aoshima');
	const Guilds = client.guilds.cache.map((guild) => guild.name);
	console.log(Guilds, 'Bağlandı!');
});

client.on('guildMemberAdd', (member) => {
	if (global.initialized) {
		client.setTimeout(() => {
			if (global.guildData[member.guild.id].hosgeldinmesaji.channelID
				&& global.guildData[member.guild.id].hosgeldinmesaji.durum) {
				const channel = member.guild.channels.cache
					.get(global.guildData[member.guild.id].hosgeldinmesaji.channelID);
				channel.send(`<@!${member.user.id}>, ${global.guildData[member.guild.id].hosgeldinmesaji.mesaj}`);
			}
		}, 2000);
	}
});

client.on('message', (message) => {
	if (global.initialized) {
		if (global.guildData[message.guild.id].sansmesaji.durum && !message.member.user.bot
			&& message.channel.id == global.guildData[message.guild.id].sansmesaji.channelID) {
			global.guildData[message.guild.id].sansmesaji.mesajSayisi += 1;
			if (global.guildData[message.guild.id].sansmesaji.mesajSayisi
				>= global.guildData[message.guild.id].sansmesaji.sayi) {
				global.guildData[message.guild.id].sansmesaji.mesajSayisi = 0;
				const randomNumber = Math.floor(Math.random()
				* global.guildData[message.guild.id].sansmesaji.liste.length);
				message.channel.send(`<@!${message.member.id}>, ${global.guildData[message.guild.id].sansmesaji.liste[randomNumber]}`);
			}
		}
	}
});

client.on('guildCreate', (guild) => {
	axios.patch(`https://yuna-chan-default-rtdb.firebaseio.com/${guild.id}.json`, {
		id: guild.id,
		name: guild.name,
		sansmesaji: {
			channelID: '',
			durum: false,
			liste: [''],
			sayi: 9999,
		},
		hosgeldinmesaji: {
			channelID: '',
			durum: false,
			mesaj: '',
		},
		sifirSifirMesaji: {
			channelID: '',
			durum: false,
			mesaj: '',
		},
	});
	global.guildData[guild.id] = {
		id: guild.id,
		name: guild.name,
		sansmesaji: {
			channelID: '',
			durum: false,
			liste: [''],
			sayi: 9999,
		},
		hosgeldinmesaji: {
			channelID: '',
			durum: false,
			mesaj: '',
		},
		sifirSifirMesaji: {
			channelID: '',
			durum: false,
			mesaj: '',
		},
	};
});

client.on('guildDelete', (guild) => {
	axios.delete(`https://yuna-chan-default-rtdb.firebaseio.com/${guild.id}.json`);
});

client.on('error', console.error);

client.on('guildMemberUpdate', async (oldMember, newMember) => {
	if (newMember.guild.id == '853678199405674517') {
		if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
			if (!oldMember.roles.cache.has('853691558276497458') && newMember.roles.cache.has('853691558276497458')) {
				const channel = newMember.guild.channels.cache
					.get('853694027928174612');
				client.setTimeout(() => {
					channel.send(`<@!${newMember.user.id}>, **Hoş geldin güzel insan ^-^** <a:galaxy_ballon:855882666633330688> <a:galaxy_heart:855882239811518464> <a:galaxy_ballon:855882666633330688>`);
				}, Number(2000));
			}
		}
	}
});

/* client.on('debug', (debug) => {
	console.log(debug);
}); */

client.login(config.token);
