import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { load } from 'js-yaml';

const parseByFormat = (file) => {
  let data;
  const format = path.extname(file);
  if (format === '.json') {
    data = JSON.parse(readFileSync(path.resolve(cwd(), file)));
  }
  if (format === '.yml' || format === '.yaml') {
    data = load(readFileSync(path.resolve(cwd(), file)));
  }
  return data;
};

export default parseByFormat;
