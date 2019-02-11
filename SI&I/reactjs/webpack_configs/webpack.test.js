const base = require('./webpack.base');

module.exports = Object.assign({}, base, {
	devtool: 'source-map',
	// resolve: Object.assign({}, base.resolve, {
	// 	alias: Object.assign({}, base.resolve.alias, {
	// 		sinon: 'sinon/pkg/sinon.js'
	// 	})
	// }),
	plugins: base.plugins,
	// module: {
	// 	noParse: [/\/sinon\.js/],
	// 	loaders: base.module.loaders.concat([
	// 		{
	// 			test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
	// 			loader: 'imports?define=>false,require=>false'
	// 		}
	// 	])
	// },
	// Enzyme fix, see:
	// https://github.com/airbnb/enzyme/issues/47
	externals: Object.assign({}, base.externals, {
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': 'window'
	})
});
