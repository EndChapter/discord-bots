/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable no-tabs */

'use strict';

const { Command } = require('@sapphire/framework');
const { default: axios } = require('axios');

module.exports = class ChangelevelupnumberCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'changelevelupnumber',
			memberName: 'changelevelupnumber',
			aliases: ['cln'],
			group: 'general',
			description: 'Level atlama sayısını değiştirir sadece 2 yönetici kullanabilir.',
			args: [
				{
					key: 'text',
					prompt: 'Level atlama sayısı kaç olsun?',
					type: 'integer',
				},
			],
		});
	}

	async run(message, { text }) {
		const { client } = this.container;
		const { levelUpNumber } = global;
		const list = {};
		axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/mesajsayisi.json').then(async (response) => {
			// eslint-disable-next-line guard-for-in, no-restricted-syntax
			for (const key in response.data) {
				// axios.post(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/mesajsayisi/${key}.json`, );
				list[key] = {
					id: key,
					mesajsayisi: () => {
						let sy = 1;
						for (let i = 0; i < response.data[key].level; i += 1) {
							sy += levelUpNumber + (levelUpNumber * i) + (i * levelUpNumber * 0.5);
						}
						sy += response.data[key].sayi;
						return sy;
					},
					level: () => {
						let level = 1;
						let sayi = parseInt(list[key].mesajsayisi() + 0);
						const levelUpNo = text;
						let LUN = levelUpNo + (levelUpNo * level) + (level * levelUpNo * 0.5);
						while (sayi > LUN) {
							sayi -= LUN;
							level += 1;
							LUN = levelUpNo + (levelUpNo * level) + (level * levelUpNo * 0.5);
						}
						return {
							kalansayi: sayi,
							level,
							levelUpNumber: LUN,
						};
					},
				};
				axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/mesajsayisi/${key}.json`, { level: list[key].level().level, sayi: list[key].level().kalansayi });
			}
			axios.patch('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/levelUp.json', { number: text });
			global.levelUpNumber = text;
		});
	}
};
