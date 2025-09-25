const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

module.exports = ( env ) => {
	return {
		entry: {
			'index': './src/index.js',
		},
		mode: env.mode,
		devtool: env.mode === 'development' ? 'source-map' : false,
		output: {
			filename: '[name].js',
			path: path.resolve( __dirname, 'dist' ),
			clean: true,
		},
		devServer: {
			static: {
				directory: path.join(__dirname, 'dist'),
			},
			compress: true,
			port: 9000,
			hot: true,
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
					},
				},
				{
					test: /\.scss$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
			],
		},
		plugins: [ 
			new MiniCssExtractPlugin(),
			new HtmlWebpackPlugin({
				template: './demo.html',
				filename: 'index.html',
				inject: false
			})
		],
		resolve: {
			extensions: [ '.js', '.jsx' ],
		},
	};
};
