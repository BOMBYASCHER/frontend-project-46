#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    const formatter = program.opts().format;
    if (formatter === 'stylish') {
      console.log(stylish(diff));
    }
  });

program.parse(process.argv);
