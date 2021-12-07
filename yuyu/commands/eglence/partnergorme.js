/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { MessageButton } = require('discord-buttons');

module.exports = class partnergorme extends Command {
	constructor(client) {
		super(client, {
			name: 'partnergorme',
			memberName: 'partnergorme',
			aliases: ['partnergörme'],
			group: 'eglence',
			description: 'Sunucuda belirli butonları görüntüler. Sadece yöneticiler kullanabilir.',
		});
	}

	run(message) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
		// if( message.channel.id === '842784398709751838' ){
			const renk = 'blurple';
			const button = {
				blurple: new MessageButton()
					.setStyle(renk)
					.setLabel('  |  Partner')
					.setID('852671121027104778'),
			};

			button.blurple.emoji = { name: 'poofheart', id: '852669012432126012', animated: true };


			const embed = new MessageEmbed();
			embed.setTitle('__WhiteRabbit Partner Görme__');
			embed.setColor('#000000');
			embed.setDescription('\n\n**Partnerlik** yapılan sunucuları görmek istiyorsanız lütfen aşağıdaki butona basınız.');
			embed.setFooter(' ');
			embed.setThumbnail('https://i.hizliresim.com/srxe7cx.gif');

			// Embed.setTimestamp();
			message.channel.send({ embed, component: button.blurple });
		}
	}
};
