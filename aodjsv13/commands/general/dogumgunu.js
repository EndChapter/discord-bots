/* eslint-disable strict */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js');
const { Command } = require('@sapphire/framework');

module.exports = class DogumgunuCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dogumgunu',
			memberName: 'dogumgunu',
			aliases: ['doğumgünü', 'a12'],
			group: 'general',
			description: 'Sunucuda belirli menüyü görüntüler. Sadece yöneticiler kullanabilir.',
		});
	}

	run(message) {
		console.log('deneme 1');
		if (message.member.permissions.has('ADMINISTRATOR') || message.member.user.id === '507232669164109824') {
			console.log('deneme 2');
			const select = {
				days: new MessageSelectMenu()
					.setCustomId('gunler')
					.setPlaceholder('Günler!(1-16)'),
				months: new MessageSelectMenu()
					.setCustomId('aylar')
					.setPlaceholder('Aylar')
					.addOptions([
						{
							label: 'Ocak',
							description: 'Ocak',
							value: '01',
						},
						{
							label: 'Şubat',
							description: 'Şubat',
							value: '02',
						},
						{
							label: 'Mart',
							description: 'Mart',
							value: '03',
						},
						{
							label: 'Nisan',
							description: 'Nisan',
							value: '04',
						},
						{
							label: 'Mayıs',
							description: 'Mayıs',
							value: '05',
						},
						{
							label: 'Haziran',
							description: 'Haziran',
							value: '06',
						},
						{
							label: 'Temmuz',
							description: 'Temmuz',
							value: '07',
						},
						{
							label: 'Ağustos',
							description: 'Ağustos',
							value: '08',
						},
						{
							label: 'Eylül',
							description: 'Eylül',
							value: '09',
						},
						{
							label: 'Ekim',
							description: 'Ekim',
							value: '10',
						},
						{
							label: 'Kasım',
							description: 'Kasım',
							value: '11',
						},
						{
							label: 'Aralık',
							description: 'Aralık',
							value: '12',
						},
					]),
			};
			select.days.addOptions(
				{
					label: '01',
					description: '01',
					value: '01',
				},
				{
					label: '02',
					description: '02',
					value: '02',
				},
				{
					label: '03',
					description: '03',
					value: '03',
				},
				{
					label: '04',
					description: '04',
					value: '04',
				},
				{
					label: '05',
					description: '05',
					value: '05',
				},
				{
					label: '06',
					description: '06',
					value: '06',
				},
				{
					label: '07',
					description: '07',
					value: '07',
				},
				{
					label: '08',
					description: '08',
					value: '08',
				},
				{
					label: '09',
					description: '09',
					value: '09',
				},
				{
					label: '10',
					description: '10',
					value: '10',
				},
				{
					label: '11',
					description: '11',
					value: '11',
				},
				{
					label: '12',
					description: '12',
					value: '12',
				},
				{
					label: '13',
					description: '13',
					value: '13',
				},
				{
					label: '14',
					description: '14',
					value: '14',
				},
				{
					label: '15',
					description: '15',
					value: '15',
				},
				{
					label: '15+',
					description: '15+',
					value: '15+',
				},

			);
			const embed = new MessageEmbed()
				.setDescription('Doğum Gününüzü seçmek için alttaki kutucukları doldurun <a:galaxy_ballon:855882666633330688>\n(Eğer Doğum Gününüz ayın ilk 15 gününden biri değilse 15+\'yı seçmelisiniz!)')
				.setColor('#F055DA')
				.setImage('https://media1.tenor.com/images/6464f57456b3c4bdcf5dbc72ce9fe9c1/tenor.gif');
			const row = new MessageActionRow().addComponents(select.days);
			const rowTwo = new MessageActionRow().addComponents(select.months);

			message.channel.send({ embeds: [embed], components: [row] });
			message.channel.send({ content: 'https://i.hizliresim.com/j4nc02q.gif', components: [rowTwo] });
			console.log('deneme 3');
		}
	}
};
