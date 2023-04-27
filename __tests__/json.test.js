import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { getDiff } from '../src/index.js';
import parseByFormat from '../src/parsers.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const correctFilePath1 = path.join(__dirname, '..', '__fixtures__', 'correct-out.json');
const correctFilePath2 = path.join(__dirname, '..', '__fixtures__', 'correct-out2.json');
const correct1 = JSON.stringify(readFileSync(correctFilePath1, 'utf-8'));
const correct2 = JSON.stringify(readFileSync(correctFilePath2, 'utf-8'));

test('Check json', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filedata1 = parseByFormat(filepath1);

  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
  const filedata2 = parseByFormat(filepath2);

  expect(JSON.stringify(json(getDiff(filedata1, filedata2)))).toEqual(correct1);

  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'file1-2.json');
  const filedata3 = parseByFormat(filepath3);

  const filepath4 = path.join(__dirname, '..', '__fixtures__', 'file2-2.yaml');
  const filedata4 = parseByFormat(filepath4);

  expect(JSON.stringify(json(getDiff(filedata3, filedata4)))).toEqual(correct2);
});
