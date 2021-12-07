/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			memberName: 'ban',
			group: 'utils',
			description: 'Bir Kullanıcıyı Banlar.',
			guildOnly: true,
			args: [
				{
					key: 'id',
					prompt: 'Banlanacak kullanıcının idsini gir',
					type: 'string',
				},
				{
					key: 'content',
					prompt: 'Banlanma sebebi?',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, { id, content, bot }) {
		const { client } = this;
		if (bot || message.member.hasPermission('BAN_MEMBERS')) {
			const guild = this.client.guilds.cache.get('842425040409460757');
			let memberTarger = guild.members.cache.get(id);
			if (!memberTarger) {
				let userid = id.split('').slice(3, 21).join('');

				memberTarger = guild.members.cache.get(userid);
				if (!memberTarger) {
					userid = id.split('').slice(2, 20).join('');
					memberTarger = guild.members.cache.get(userid);
					if (!memberTarger) {
						message.channel.send('Lütfen geçerli bir id gir ve tekrar dene!');
						return;
					}
				}
			}
			const username = memberTarger.user.tag;
			// eslint-disable-next-line max-statements-per-line, func-names, prefer-arrow-callback
			await message.channel.send(`${username} banlandı!`).then((msg) => client.setTimeout(function() { message.delete(); msg.delete(); }), Number(2000));
			memberTarger.ban();
			const channel = message.guild.channels.cache.get('842819414663626772');
			if (content == '') {
				// eslint-disable-next-line no-param-reassign
				content = 'belirtilmedi';
			}
			// const request = message.member.roles.cache.has('836557251912531968');
			const embed = new MessageEmbed()
				.setColor('#000000')
				.setTitle('❗ >> Yeni Bildiri')
				.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
				.setThumbnail('https://i.hizliresim.com/srxe7cx.gif')
			// .setImage('https://media1.tenor.com/images/d07cd2413993b2b9f68a69d9f1aa8435/tenor.gif')
				.setDescription(`${username} banlandı!\n Sebep: ${content}`)
				.setTimestamp();
			channel.send(embed);
		}
	}
};
