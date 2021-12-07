/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { Command } = require('discord.js-commando');

module.exports = class partner extends Command {
	constructor(client) {
		super(client, {
			name: 'partner',
			memberName: 'partner',
			aliases: ['partnre', 'prtner', 'pt', 'p'],
			group: 'register',
			description: 'Yeni gelen kullanıcıyı partner olarak kayıt eder.',
			guildOnly: true,
			args: [
				{
					key: 'newUser',
					prompt: 'Kayıt etmek istediğin kullanıcıyı etiketlemezsen hangi kullanıcıyı kayıt etmek istediğini bilemem, kullanıcıyı sonraki mesajda etiketleyebilirsin veya komutu iptal edebilirsin...',
					type: 'string',
				},
			],
		});
	}

	async run(message, { newUser }) {
		// if(message.channel.id == '844374778479640577'){
		if (message.member.roles.cache.has('844372994385117195') || message.member.roles.cache.has('852672587712823346')) {
			const user = message.guild.members.cache.find((member) => member.id === newUser);
			if (user == undefined) {
				message.say('Lütfen geçerli bir id girin');
				return;
			}
			if (user.roles.cache.has('843289751935254568')) {
				user.roles.add('852671121027104778');
				message.channel.send(`**${user.user.username}** partner olarak kayıt edildi.`)
			}
			else {
				message.say('bunu yapmanız için kullanıcının kayıtsız rolüne sahip olması gerekir!!');
			}
		}
		else {
			message.say('Bunu yapmaya yetkin yok!');
		}
		// let userid = newUser.split('').slice(3,21).join('');

		// member.roles.add('842467298044674059');
		// member.roles.add('843884074468900865');
	}
};
