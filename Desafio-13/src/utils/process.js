import { Command } from 'commander';

const program = new Command()
program
    .option('--mode <mode>', 'Working mode', 'development')

const processOptions = program.parse()

export default processOptions