const webpack = require('webpack');
const project = require('./project');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: project.dir_root,
	node: {
		fs: 'empty'
	},
	resolve : {
		alias : {
			common: path.resolve(project.dir_src, 'components', 'common'),
			types: path.resolve(project.dir_src, 'types'),
			utils: path.resolve(project.dir_src, 'utils'),
			actions: path.resolve(project.dir_src, 'actions'),
			constants: path.resolve(project.dir_src, 'constants'),
			reducers: path.resolve(project.dir_src, 'store', 'reducers'),
			selectors: path.resolve(project.dir_src, 'store', 'selectors'),
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
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
							'flow',
							[
								'env',
								{
									targets: {
										ie: '11'
									},
									modules: false,
									exclude: ['transform-async-to-generator']
								}
							],
							'react',
							'stage-1'
						],
						plugins: ['lodash', 'fast-async', 'transform-runtime', 'transform-object-rest-spread', 'react-hot-loader/babel', 'transform-decorators-legacy']
					}
				}
			},

		]
	},
	plugins: [
		new webpack.DefinePlugin(project.globals),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'EMMS',
			// filename : `index.${process.env.REGION.toLowerCase()}.html`,
			filename: 'index.html',
			template: path.resolve(__dirname, '..', 'html', 'index.template.ejs'),
			inject: 'body'
		})
	]
};
