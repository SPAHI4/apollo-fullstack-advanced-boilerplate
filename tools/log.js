import notifier from 'node-notifier';
import colors from 'colors/safe';

export default (title) => (options) => {
	title = `${title.toUpperCase()}`;

	if (options.notify) {
		notifier.notify({
			title,
			message: options.message,
		});
	}

	const level = options.level || 'info';
	const msg = `==> ${title} -> ${options.message}`;

	switch (level) {
		case 'warn':
			console.log(colors.yellow(msg));
			break;
		case 'error':
			console.log(colors.bgRed.white(msg));
			break;
		case 'info':
		default:
			console.log(colors.green(msg));
	}
}
