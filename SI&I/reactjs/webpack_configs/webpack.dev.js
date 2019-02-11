const webpack = require('webpack');
const resolve = require('path').resolve;

const base = require('./webpack.base');
const project = require('./project');

module.exports = Object.assign({}, base, {
	entry: [
		'babel-polyfill',
		resolve(project.dir_src, 'index.js')
	],
	output: {
		path : project.dir_public,
		filename: 'js/[hash].bundle.js',
		publicPath: '/'
	},
	devtool: 'cheap-module-source-map',
	plugins: base.plugins.concat([
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]),
	watchOptions : {
		ignored: /node_modules/
	},
	devServer: {
		// contentBase: './',  //Relative directory for base of server
		hot: true,        //Live-reload
		port: project.dev_server_port,        //Port Number
		host: '0.0.0.0',  //Change to '0.0.0.0' for external facing server
		inline: true,
		// public: 'emms.jwelighting.com',
		disableHostCheck: true,
		historyApiFallback : {
			index: '/index.html'
		},

		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		},


	},
	externals: {
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true
	}
});
