/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
/* eslint-disable class-methods-use-this */

'use strict';

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			memberName: 'help',
			group: 'utils',
			description: 'Yardım bilgisini görüntler.',
		});
	}

	run(message) {
		const { client } = this;
		const embed = new MessageEmbed()
			.setDescription('`a.ban <kullanıcı id> <sebep>`: **Bir kullanıcıyı banlar.**\n\n'
            + '`a.unban <kullanıcı id>`: **Kullanıcının varsa banını kaldırır.**\n\n'
            + '`a.mute <kullanıcı id> <sayı,dk/sn> <sebep>`: **Bir kullanıcıyı susturur.**\n\n'
            + '`a.unmute <kullanıcı id>`: **Kullanıcının mute\'unu kaldırır.**\n\n'
            + '`a.uyarı <kullanıcı id> <sebep>`: **Kullanıcıya uyarı verir. (sebebi yazmak zorunludur.)**\n\n'
            + '`a.sicil <kullanıcı id>`: **Kullanıcıya verilen uyarıları gösterir.**\n\n'
            + '`a.jail <kullanıcı id> <sebep>`: **Kişiyi jail kanalına atar.**\n\n'
			+ '`a.unjail <kullanıcı id>`: **Kişiyi jailden çıkarır.**\n\n'
            + '`a.slowmode <saniye süresi>`: **Sohbete belirtilen saniye sayısınca yazma süresi verir.**\n\n'
            + '`a.spam <aç/kapat>`: **Spam koruma özelliğini açar.**')
			.setTitle(`__${client.user.username} Yardım Komutu__`)
			.setColor('#2CE6E0')
			.setTimestamp();
		message.channel.send(embed);
	}
};
