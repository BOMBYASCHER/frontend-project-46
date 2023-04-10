import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(path.resolve(cwd(), filepath1)));
  const file2 = JSON.parse(readFileSync(path.resolve(cwd(), filepath2)));
  const keys = _.union(Object.keys(file1), Object.keys(file2));

  const data = keys.sort().map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return `+ ${key}: ${file2[key]}`;
    }
    if (!Object.hasOwn(file2, key)) {
      return `- ${key}: ${file1[key]}`;
    }
    if (file1[key] === file2[key]) {
      return `${key}: ${file1[key]}`;
    }
    return [`- ${key}: ${file1[key]}`, `+ ${key}: ${file2[key]}`];
  }).flat();
  const result = data.reduce((acc, info) => `${acc}\n  ${info}`, '');
  return `{${result}\n}`;
};

export default genDiff;
