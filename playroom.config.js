module.exports = {
	components: './src/components',
	outputPath: './dist/playroom',

	// Optional:
	title: 'Metro Testing',
	// themes: './src/themes',
	frameComponent: './playroom/FrameComponent.js',
	widths: [320, 375, 768, 1024],
	port: 9000,
	openBrowser: true,
	exampleCode: `
		<Button>
			Hello World!
		</Button>
	`,
	// webpackConfig: () => ({
	//	// Custom webpack config goes here...
	// })
}