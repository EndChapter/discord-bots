/* eslint-disable strict */
/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-tabs */

'use strict';

const { MessageAttachment } = require('discord.js');
const { Command } = require('@sapphire/framework');
const Canvas = require('canvas');
// const Database = require('better-sqlite3');
const { default: axios } = require('axios');
// const db = new Database('./db/user.db', { verbose: console.log });

module.exports = class LevelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'level',
			memberName: 'level',
			aliases: ['levle', 'levl', 'rank'],
			group: 'general',
			description: 'Şu anki seviye durumunuzu ayrıntılı olarak görüntüler.',
		});
	}

	async run(message) {
		const applyText = (canvas, text) => {
			const context = canvas.getContext('2d');

			let fontSize = 78;

			do {
				context.font = `italic ${fontSize -= 10}px Open Sans`;
			} while (context.measureText(text).width > 500);

			return context.font;
		};
		const applyUserText = (canvas, text) => {
			const context = canvas.getContext('2d');

			let fontSize = 126;

			do {
				context.font = `italic ${fontSize -= 10}px Open Sans Semibold`;
			} while (context.measureText(text).width > 1050);

			return context.font;
		};
		function dynamicSort(property) {
			let sortOrder = 1;
			if (property[0] === '-') {
				sortOrder = -1;
				property = property.substr(1);
			}
			return function(a, b) {
				/* next line works with strings and numbers,
				 * and you may want to customize it to your needs
				 */
				const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
				return result * sortOrder;
			};
		}
		function dynamicSortMultiple() {
			/*
			 * save the arguments object as it will be overwritten
			 * note that arguments object is an array-like object
			 * consisting of the names of the properties to sort by
			 */
			const props = arguments;
			return function(obj1, obj2) {
				let i = 0; let
					result = 0;
				const numberOfProperties = props.length;
				/* try getting a different result from 0 (equal)
				 * as long as we have extra properties to compare
				 */
				while (result === 0 && i < numberOfProperties) {
					result = dynamicSort(props[i])(obj1, obj2);
					i += 1;
				}
				return result;
			};
		}
		function roundRect(context, x, y, width, height, radius, fill, stroke, color) {
			context.fillStyle = color;
			if (typeof stroke === 'undefined') {
				stroke = true;
			}
			if (typeof radius === 'undefined') {
				radius = 5;
			}
			context.beginPath();
			context.moveTo(x + radius, y);
			context.lineTo(x + width - radius, y);
			context.quadraticCurveTo(x + width, y, x + width, y + radius);
			context.lineTo(x + width, y + height - radius);
			context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			context.lineTo(x + radius, y + height);
			context.quadraticCurveTo(x, y + height, x, y + height - radius);
			context.lineTo(x, y + radius);
			context.quadraticCurveTo(x, y, x + radius, y);
			context.closePath();
			if (stroke) {
				context.stroke();
			}
			if (fill) {
				context.fill();
			}
			context.fillStyle = '#ffffff';
		}
		let sayi = 0;
		let level = 1;
		// const userid = message.member.id;
		const { levelUpNumber } = global;
		const list = [];
		let siralama = 1;
		/* const control =  db.prepare('SELECT userdata.level, userdata.sayi FROM userdata WHERE userdata.id = ?');
		const user = await control.get(userid);

		const userdata = db.prepare("SELECT level, sayi, id FROM userdata ORDER BY level DESC, sayi DESC")
		//console.log(userdata.iterate())
		for (const usr of userdata.iterate()) {
			list.push({userid: usr.id, usersayi: usr.sayi, userlevel: usr.level});
		}
		console.log(list);
		for(let i = 0; i < list.length; i += 1){
			if(list[i].userid == message.member.id){
				siralama = i+ 1;
			}
		} */
		axios.get('https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/mesajsayisi.json').then(async (response) => {
			if (response.data == null) {
				await axios.patch(`https://toman-bot-default-rtdb.europe-west1.firebasedatabase.app/aoshima/mesajsayisi/${message.member.id}.json`, { sayi: 1, level: 1 });

				sayi = 1;
				level = 0;
			}
			else {
				for (const key in response.data) {
					if (key == message.member.id) {
						sayi = response.data[key].sayi;
						level = response.data[key].level;
					}
					list.push({ id: key, sayi: response.data[key].sayi, level: response.data[key].level });
				}

				list.sort(dynamicSortMultiple('-level', '-sayi'));
			}

			let levelUpCoefficientOne = levelUpNumber + (levelUpNumber * level) + (level * levelUpNumber * 0.5);
			console.log(levelUpCoefficientOne);
			for (let x = 0; x < list.length; x += 1) {
				if (list[x].id == message.member.id) {
					siralama = x + 1;
				}
			}
			let percent = ((sayi / levelUpCoefficientOne) * 1150);
			const exp = `${sayi}/${levelUpCoefficientOne} xp`;
			const rank = `#${siralama}`;
			const canvas = Canvas.createCanvas(2690, 972);

			const context = canvas.getContext('2d');

			const background = await Canvas.loadImage('https://i.imgur.com/8HfCYYG.png');
			context.drawImage(background, 0, 0, canvas.width, canvas.height);
			context.strokeStyle = '#74037b';
			context.strokeRect(0, 0, canvas.width, canvas.height);
			context.font = applyUserText(canvas, message.member.user.tag);
			context.textAlign = 'center';
			context.fillStyle = '#ffffff';
			// eslint-disable-next-line no-inline-comments
			context.fillText(message.member.user.tag, 1415/* canvas.width / 2.5 */, 415/* canvas.height / 1.8 */);

			context.font = '129px Open Sans Semibold';
			// eslint-disable-next-line no-inline-comments
			context.fillText(level, 410/* canvas.width / 2.5 */, 850/* canvas.height / 1.8 */);
			// Pick up the pen


			context.font = '129px Open Sans Semibold';
			// eslint-disable-next-line no-inline-comments
			context.fillText(rank, 2350, 415/* canvas.height / 1.8 */);

			context.font = await applyText(canvas, exp);
			// eslint-disable-next-line no-inline-comments
			context.fillText(exp, 1085, 840/* canvas.height / 1.8 */);

			if (percent < 145) {
				percent = 145;
			}
			roundRect(context, 1450, 625, 1150, 250, 100, true, true, '#000000');

			roundRect(context, 1450, 625, percent, 250, 100, true, true, '#ffffff');
			context.beginPath();
			context.arc(410, 265, 245, 0, Math.PI * 2, true);
			context.closePath();
			context.clip();
			const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
			context.drawImage(avatar, 150, 10, 510, 510);


			const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

			message.channel.send({files: [attachment]});
		});
	}
};
