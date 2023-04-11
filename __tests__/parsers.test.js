import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import parseByFormat from '../src/parsers.js';

const correctOutput1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const correctOutput2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('Check parser (relative path)', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';

  expect(parseByFormat(path1)).toEqual(correctOutput1);
  expect(parseByFormat(path2)).toEqual(correctOutput2);

  const path3 = '__fixtures__/file1.yml';
  const path4 = '__fixtures__/file2.yml';

  expect(parseByFormat(path3)).toEqual(correctOutput1);
  expect(parseByFormat(path4)).toEqual(correctOutput2);
});

test('Check parser (absolute path)', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const path1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const path2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');

  expect(parseByFormat(path1)).toEqual(correctOutput1);
  expect(parseByFormat(path2)).toEqual(correctOutput2);

  const path3 = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const path4 = path.join(__dirname, '..', '__fixtures__', 'file2.yml');

  expect(parseByFormat(path3)).toEqual(correctOutput1);
  expect(parseByFormat(path4)).toEqual(correctOutput2);
});
