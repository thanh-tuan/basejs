const winston = require('winston');
const logger = new (winston.Logger)();

// Default log options if not configured
config.log = config.log || {};

// Add console output
if (config.log.console) {
	logger.add(winston.transports.Console, {
		level: config.log.level
	});
}

// Add file output
if (config.log.file) {
	logger.add(winston.transports.File, {
		level: config.log.level,
		filename: config.log.file,
		timestamp: true
	});
}

// Add worker id to log messages
logger.filters.push((level, msg, meta) => {
	return process.worker ? `(${process.worker.id}) ${msg}` : msg;
});

// Add general stream support
logger.stream = {
	write: (message, encoding) => {
		logger.info(message.trim());
	}
};

module.exports = logger;
