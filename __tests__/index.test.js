import { beforeEach } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/index.js';

let correctPath1;
let correctPath2;

beforeEach(() => {
  correctPath1 = '__fixtures__/file1.json';
  correctPath2 = '__fixtures__/file2.json';
});

test('GenDiff check', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  expect(genDiff(filepath1, filepath2)).toEqual(genDiff(correctPath1, correctPath2));
});
