const webpack = require('webpack');
const path = require('path');

var CompressionPlugin = require('compression-webpack-plugin');

const base = require('./webpack.base');
const project = require('./project');

const plugins = [
	new CompressionPlugin({
		asset: '[path].gz[query]',
		algorithm: 'gzip',
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0
	})
];
if (process.env.NODE_ENV == 'production')
	plugins.unshift(new webpack.optimize.UglifyJsPlugin({
		mangle: true,
		compress: {
			warnings: false,
			pure_getters: true,
			unsafe: false,
			unsafe_comps: false,
			screw_ie8: false
		},
		output: {
			comments: false
		},
		exclude: [/\.min\.js$/gi]
	}));

module.exports = Object.assign({}, base, {
	entry: ['babel-polyfill', path.resolve(project.dir_src, 'index.js')],
	output: {
		filename: 'js/[hash].bundle.js',
		path: project.dir_public,
		publicPath: '/'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			// {
			// 	enforce: 'pre',
			// 	test: /\.jsx?$/,
			// 	exclude: [ project.dir_modules ],
			// 	loader: 'eslint-loader?parser=babel-eslint'
			// },
			{
				test: /\.worker\.js$/,
				use: { loader: 'worker-loader', options: { name: 'js/[hash].worker.js', publicPath: '/' } },
			},
			{
				test: /\.jsx?$/,
				exclude: [ project.dir_modules ],
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [
							[
								'env',
								{
									modules: false,
									exclude: ['transform-async-to-generator']
								}
							],
							'react',
							'stage-1'
						],
						plugins: ['lodash', 'fast-async', 'transform-runtime', 'transform-object-rest-spread', 'transform-decorators-legacy']
					}
				}
			}
		]
	},
	plugins: base.plugins.concat(plugins),
});
