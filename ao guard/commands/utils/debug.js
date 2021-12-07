/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */

'use strict';

const { Command } = require('discord.js-commando');

module.exports = class istek extends Command {
	constructor(client) {
		super(client, {
			name: 'debug',
			memberName: 'debug',
			group: 'utils',
			description: 'Bir Kullanıcının Susturulmasını Kaldırır.',
			guildOnly: true,
		});
	}

	// eslint-disable-next-line no-unused-vars
	run(message) {
		// message.member.roles.remove('842425428861648916');
	}
};
