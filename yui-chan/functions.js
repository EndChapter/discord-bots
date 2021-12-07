/* eslint-disable eqeqeq */
/* eslint-disable no-tabs */
module.exports = {
	timeout(client, guildID, channelID, message, degistirilmeSayisi) {
		if (guildID == '' || channelID == '' || message == '') {
			return;
		}

		const endofDay = new Date();
		const now = Date.now();
		// one day to miliseconds
		const oneDay = 86400000;
		endofDay.setHours(20, 59, 59, 999);
		const guild = client.guilds.cache.get(guildID);
		const channel = guild.channels.cache.get(channelID);
		client.setTimeout(async () => {
			if (degistirilmeSayisi != global.guildData[guildID].sifirSifirMesaji.degistirilmeSayisi
				&& !global.guildData[guildID].sifirSifirMesaji.durum) {
				return;
			}
			await channel.send(message);
			endofDay.setHours(20, 59, 59, 999);

			// interval for 1 day
			setInterval(async () => {
				if (degistirilmeSayisi != global.guildData[guildID].sifirSifirMesaji.degistirilmeSayisi
					&& !global.guildData[guildID].sifirSifirMesaji.durum) {
					return;
				}
				await channel.send(message);
				endofDay.setHours(20, 59, 59, 999);
			}, oneDay);
		}, (endofDay.valueOf()) - (now.valueOf()));
	},
};
