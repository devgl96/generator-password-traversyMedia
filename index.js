#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const log = console.log;
const createPassword = require("./utils/createPassword");
const savePassword = require("./utils/savePassword");

program.version("1.0.0").description("Simple Password Generator");

// To create action in according to command line arguments
// program.command('generate').action(() => {
//     console.log("Generated")
// }).parse();

program
.option("-l, --length <number>", 'length of password', "8")
.option("-s, --save", 'save password to passwords.txt', false)
.option("-nn, --no-numbers", 'remove numbers')
.option("-ns, --no-symbols", 'remove symbols')
.parse();

// console.log(program.opts())
const { length, save, numbers, symbols } = program.opts();

// console.log(numbers, symbols);

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

// Save to file
if(save) {
    savePassword(generatedPassword);
}

// Copy to clipboard
clipboardy.writeSync(generatedPassword);

// Output generated password 
log(chalk.blue('Generate Password: ') + chalk.bold(generatedPassword));
log(chalk.yellow("Password copied to clipboard"));