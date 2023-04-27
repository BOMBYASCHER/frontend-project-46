import plain from '../src/formatters/plain.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { getDiff } from '../src/index.js';
import parseByFormat from '../src/parsers.js';

let correct1;
let correct2;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'correct-out-plain.txt');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'correct-out-plain2.txt');
  correct1 = readFileSync(filepath1, 'utf-8');
  correct2 = readFileSync(filepath2, 'utf-8');
});

test('Check plain', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filedata1 = parseByFormat(filepath1);

  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
  const filedata2 = parseByFormat(filepath2);

  expect(plain(getDiff(filedata1, filedata2))).toEqual(correct1);

  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'file1-2.json');
  const filedata3 = parseByFormat(filepath3);

  const filepath4 = path.join(__dirname, '..', '__fixtures__', 'file2-2.yaml');
  const filedata4 = parseByFormat(filepath4);

  expect(plain(getDiff(filedata3, filedata4))).toEqual(correct2);
});
