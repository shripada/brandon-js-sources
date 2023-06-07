const chalk = require('chalk');

// Creating theme
const warning = chalk.red;

// Printing theme text
console.log(warning('Restricted Zone'));
const welcome = chalk.green;
console.log(welcome('GFG'));

const logger = (method) => (message) => console.log(method(message));

logger(chalk.green)('hi');
