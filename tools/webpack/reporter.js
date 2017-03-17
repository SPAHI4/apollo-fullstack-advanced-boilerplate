import Ora from 'ora';
import Minilog from 'minilog';
Minilog.enable();
import elegantStatus from 'elegant-status';


export default class WebpackReporter {
	constructor(compiler, name) {
		this.name = name;
		this.compiler = compiler;
		this.log = Minilog(`webpack-${name}`);
		this.spinner = elegantStatus();
		compiler.plugin('compile', this.showStartMessage);
	}

	showStartMessage = () => {
		this.spinner.updateText(`${this.name}: starting build...`);
	}

	reporter = (isDevServer) => (err, stats) => {
		debugger;
		if (isDevServer) {
			stats = err.stats;
			if (err.state) {
				err = false;
			}
		}

		if (err) {
			this.spinner.updateText(`${this.name}: build error`);
			this.spinner(true);
			if (!isDevServer){
				this.log.error(err.stack || err);
				if (err.details) {
					this.log.error(err.details);
				}
				return;
			}
		} else {
			this.spinner.updateText(`${this.name}: build succeed`);
			this.spinner(true);
		}

		stats && this.log.log(stats.toString({
			hash: false,
			version: false,
			timings: true,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: true,
			errors: true,
			errorDetails: true,
			warnings: true,
			publicPath: false,
			colors: true,
		}));
	}

}
