const path = require('path');
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@', path.join(__dirname, '../lib'));

const app = require('../lib/app');

module.exports = (req, res) => {
	    app.callback()(req, res);
};
