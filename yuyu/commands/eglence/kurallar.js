/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { prefix } = require('../../config.json');

module.exports = class partnerKurallari extends Command {
	constructor(client) {
		super(client, {
			name: 'partnerkurallari',
			memberName: 'partnerkurallari',
			aliases: ['pk'],
			group: 'eglence',
			description: 'Partner kurallarını görüntüler. Sadece yöneticiler kullanabilir!',
		});
	}

	run(message) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.send('```━ Partner yapacağımız sunucuda küfür yasak olmalıdır aksi takdirde partnerlik bozulur.\n\n━ Partnerlik yapacağımız sunucuda üye sayısı eğer 100 kişiden yüksekse 1, 50 kişiden yüksekse 2, 50 kişinin altındaysa 3 yetkili gelmelidir.\n\n━ Partnerlik yapacağımız kişi sunucuda olmak zorundadır.\n\n━ Partnerlik yapacağımız sunucuda NSFW kanalı herkese açık olmamalıdır.\n\n━ Partnerlik yaptığımız kişi sunucudan çıkarsa partnerlik iptal olur.\n\nNot\nAnime dışı sunuculara partnerlik yapmıyoruz.```')
		}
	}
};
