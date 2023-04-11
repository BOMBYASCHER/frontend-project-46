import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { load } from 'js-yaml';

const parseByFormat = (file) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': load,
    '.yaml': load,
  };
  const format = path.extname(file);
  const data = parsers[format](readFileSync(path.resolve(cwd(), file)));
  return data;
};

export default parseByFormat;
