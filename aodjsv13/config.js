/* eslint-disable no-tabs */

'use strict';

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	prefix: 'a!',
	token: process.env.TOKEN,
};
