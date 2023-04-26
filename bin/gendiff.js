#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js';
import chooseFormatter from '../src/formatters/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format;
    const formatter = chooseFormatter(formatName);
    const diff = genDiff(filepath1, filepath2, formatter);
    console.log(diff);
  });

program.parse(process.argv);
