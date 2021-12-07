/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const utf8 = require('utf8');

const riotKey = `api_key=${process.env.RIOTKEY}`;
const fetch = require('node-fetch');

module.exports = class profile extends Command {
	constructor(client) {
		super(client, {
			name: 'profile',
			memberName: 'profile',
			aliases: ['profil', 'acc'],
			group: 'eglence',
			description: 'Kullanıcının profilini görüntüler.',
			args: [
				{
					key: 'text',
					prompt: 'Kimin profilini görüntülemek istersin?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { text }) {
		const summonerSearchLink = 'https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
		const accountInfoLink = 'https://tr1.api.riotgames.com/lol/league/v4/entries/by-summoner/';
		const masterySearchLink = 'https://tr1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/';

		const rankedConvert = {
			IRON: 0,
			BRONZE: 1,
			SILVER: 2,
			GOLD: 3,
			PLATINUM: 4,
			DIAMOND: 5,
			MASTER: 6,
			GRANDMASTER: 7,
			CHALLENGER: 8,
		};

		const numsToRank = {
			0: 'IRON',
			1: 'BRONZE',
			2: 'SILVER',
			3: 'GOLD',
			4: 'PLATINUM',
			5: 'DIAMOND',
			6: 'MASTER',
			7: 'GRANDMASTER',
			8: 'CHALLENGER',
		};
		let summonerName = text;
		summonerName = utf8.encode(summonerName);
		// Summoner ID
		let encryptedID = ''; 
		let summonerLevel = '';

		// *rank
		// Champion ID lookup table
		const IDResponse = await fetch('http://ddragon.leagueoflegends.com/cdn/11.11.1/data/tr_TR/champion.json');
		const IDTable = await IDResponse.json();


		const link = `${summonerSearchLink + summonerName}?${riotKey}`;
		const response = await fetch(link);
		const summonerData = await response.json();
		if (summonerData.hasOwnProperty('status') && summonerData.status.status_code == 404) {
			message.channel.send('Bu Sihirdar Bulunamadı!');
			return;
		}

		encryptedID = summonerData.id;
		summonerName = summonerData.name;
		summonerLevel = summonerData.summonerLevel;
		const profileID = summonerData.profileIconId;
		// console.log(summonerData);

		// Champion Mastery Lookup

		const masteries = [];
		const names = [];
		const masteryLink = `${masterySearchLink + encryptedID}?${riotKey}`;
		const masteryResponse = await fetch(masteryLink);
		const masteryData = await masteryResponse.json();

		// Parse out mastery level, mastery points, and champion names
		let masteryLenght = 10;
		if (masteryData.length < 10) {
			masteryLenght = masteryData.length;
		}
		for (let i = 0; i < masteryLenght; i += 1) {
			const id = masteryData[i].championId;
			const points = masteryData[i].championPoints;
			const level = masteryData[i].championLevel;
			let champName = '';
			let m = '';
			let n = '';
			for (const key in IDTable.data) {
				if (IDTable.data[key].key == id) {
					champName = IDTable.data[key].id;
					n = champName;
					m = `Ustalık Leveli: ${level}     Ustalık Puanı: ${points}`;
					masteries.push(m);
					names.push(n);
				}
			}
		}


		const rankLink = `${accountInfoLink + encryptedID}?${riotKey}`;
		const accountResponse = await fetch(rankLink);
		const accountData = await accountResponse.json();
		const rankEmbed = new MessageEmbed();
		let highestRank = -1;

		// Unranked Account
		if (accountData.length == 0) {
			rankEmbed.setColor('#000000');
			rankEmbed.setTitle(`${summonerName} Profili`);
			rankEmbed.setDescription(`Level: ${summonerLevel}\nBu kişi şu anda unranked`);
		}
		else {
			// Parse first ranked queue
			let queueType = '';
			if (accountData[0].queueType == 'RANKED_SOLO_5x5') {
				queueType = 'Dereceli Tekli/Çiftli';
			}
			else {
				queueType = 'Dereceli Esnek 5x5';
			}

			highestRank = Math.max(highestRank, rankedConvert[accountData[0].tier]);
			let rankTier = `${accountData[0].tier}  ${accountData[0].rank}  ${accountData[0].leaguePoints} LP.`;
			let win = accountData[0].wins;
			let lose = accountData[0].losses;
			let winRate = Math.round(win / (win + lose) * 1000) / 10;
			let WRData = `Kazanma: \`${win}\`  Kaybetme: \`${lose}\`  Kazanma Oranı: \`${winRate}%\``;

			rankEmbed.setColor('#000000');
			rankEmbed.setTitle(`${summonerName} Profili`);
			rankEmbed.setDescription(`Level: \`${summonerLevel}\``);
			rankEmbed.addFields(
				{ name: `${queueType}: ${rankTier}`, value: WRData },
			);
			rankEmbed.setThumbnail('https://raw.githubusercontent.com/StevenWu2001/Discord-Bot-for-LOL/main/img/rankEmblems/Emblem_Grandmaster.png');

			// Check Ranked Promotion Series
			if (accountData[0].hasOwnProperty('miniSeries')) {
				const { progress } = accountData[0].miniSeries;
				let progressStr = '';
				const nextRank = numsToRank[rankedConvert[accountData[0].tier] + 1];
				for (const c in progress) {
					if (progress[c] == 'L') {
						progressStr += ':x:   ';
					}
					else if (progress[c] == 'W') {
						progressStr += ':o:   ';
					}
					else {
						progressStr += ':question:   ';
					}
				}

				rankEmbed.addField(`\`\`${summonerName} ${nextRank} serilerinde!\`\` `, progressStr);
			}

			// Parse second ranked queue (if exist)
			if (accountData.length == 2) {
				if (accountData[1].queueType == 'RANKED_SOLO_5x5') {
					queueType = 'Dereceli Tekli/Çiftli';
				}
				else {
					queueType = 'Dereceli Esnek 5x5';
				}

				highestRank = Math.max(highestRank, rankedConvert[accountData[1].tier]);
				rankTier = `${accountData[1].tier}  ${accountData[1].rank}  ${accountData[1].leaguePoints} LP.`;
				win = accountData[1].wins;
				lose = accountData[1].losses;
				winRate = Math.round(win / (win + lose) * 1000) / 10;
				WRData = `Kazanma: \`${win}\`  Kaybetme: \`${lose}\`  Kazanma Oranı: \`${winRate}%\``;

				rankEmbed.addFields(
					{ name: `${queueType}:  ${rankTier}`, value: WRData },
				);

				// Check Ranked Promotion Series
				if (accountData[1].hasOwnProperty('miniSeries')) {
					const { progress } = accountData[1].miniSeries;
					let progressStr = '';
					const nextRank = numsToRank[rankedConvert[accountData[1].tier] + 1];
					for (const c in progress) {
						if (progress[c] == 'L') {
							progressStr += ':x:   ';
						}
						else if (progress[c] == 'W') {
							progressStr += ':o:   ';
						}
						else {
							progressStr += ':question:   ';
						}
					}

					rankEmbed.addField(`\`\`${summonerName} ${nextRank} serilerinde!\`\` `, progressStr);
				}
			}
		}

		rankEmbed.setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.11.1/img/profileicon/${profileID}.png`);

		rankEmbed.addFields(
			{ name: `1: ${names[0]}`, value: masteries[0] },
			{ name: `2: ${names[1]}`, value: masteries[1] },
			{ name: `3: ${names[2]}`, value: masteries[2] },
			{ name: `4: ${names[3]}`, value: masteries[3] },
			{ name: `5: ${names[4]}`, value: masteries[4] },
		);
		message.channel.send(rankEmbed);
	}
};
