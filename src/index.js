import _ from 'lodash';
import parseByFormat from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parseByFormat(filepath1);
  const file2 = parseByFormat(filepath2);
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
