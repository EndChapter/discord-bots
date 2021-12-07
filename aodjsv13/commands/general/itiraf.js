/* eslint-disable strict */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { MessageEmbed } = require('discord.js');
const { Command } = require('@sapphire/framework');
const { prefix } = require('../../config.js');

module.exports = class itirafCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'itiraf',
			memberName: 'itiraf',
			aliases: ['itirfa', 'itraf', 'itiaf'],
			group: 'general',
			description: 'Kullanıcının yaptığı itirafı anonim olarak görüntüler.',
			args: [
				{
					key: 'text',
					prompt: 'Hangi isteği göndermek istersin?',
					type: 'string',
				},
			],
		});
	}

	async run(message, args) {
		if (message.channel.id === '881520395960873010' || message.channel.id === '881585368959430696' || message.channel.type === 'dm') {
			const guild = this.container.client.guilds.cache.get('879758969814515752');
			const channel = guild.channels.cache.get('881520395960873010');
			const embed = new MessageEmbed()
				.setColor('#20A84E')
				.setAuthor('Anonim Üye', this.container.client.user.displayAvatarURL())
				.setDescription(await args.rest('string'))
				.setTimestamp();
			channel.send({ content: `${prefix}itiraf <itiraf>`, embeds: [embed] });
			message.delete({ timeout: 100 });
		}
	}
};
