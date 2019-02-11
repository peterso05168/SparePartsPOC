const path  = require('path');
const debug = require('debug')('app:config:project');
const argv  = require('yargs').argv;

const resolve = path.resolve;

debug('Create project configuration');

const PROJECT_ROOT = path.resolve(__dirname, '..');


const config = {
	env              : process.env.NODE_ENV || 'development',
	dir_src          : resolve(PROJECT_ROOT, 'src'),
	dir_modules      : resolve(PROJECT_ROOT, 'node_modules'),
	dir_public       : resolve(process.env.HOME, 'public'),
	dir_dev          : resolve(PROJECT_ROOT, 'dev'),
	dev_server_port  : process.env.PORT || 8081,
};


config.globals = {
	'process.env'  : {
		'NODE_ENV' : JSON.stringify(config.env),
	},
	'BABEL_ENV'    : config.env,
	'NODE_ENV'     : config.env,
	'APP_SERVER': JSON.stringify(config.env == 'production' || config.env == 'debug' ? 'http://localhost:3000' : 'http://localhost:3000'),
	'AUTH_SERVER': JSON.stringify(config.env == 'production' || config.env == 'debug' ? 'http://localhost:3000' : 'http://localhost:3000'),
	'__DEV__'      : config.env === 'development',
	'__DEBUG__'    : config.env === 'debug',
	'__PROD__'     : config.env === 'production',
	'__TEST__'     : config.env === 'test',
	'__COVERAGE__' : !argv.watch && config.env === 'test',
	'__BASENAME__' : JSON.stringify(process.env.BASENAME || ''),
};

module.exports = config;
