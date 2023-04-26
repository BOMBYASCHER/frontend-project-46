import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/index.js';
import plain from '../src/formatters/plain.js';
import stylish from '../src/formatters/stylish.js';

test('Check gendiff', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const correctPath1 = '__fixtures__/file1.json';
  const correctPath2 = '__fixtures__/file2.json';
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');

  expect(genDiff(filepath1, filepath2, plain)).toEqual(genDiff(correctPath1, correctPath2, plain));

  const correctPath3 = '__fixtures__/file1.yml';
  const correctPath4 = '__fixtures__/file2.yml';
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const filepath4 = path.join(__dirname, '..', '__fixtures__', 'file2.yml');

  expect(genDiff(filepath3, filepath4, stylish))
    .toEqual(genDiff(correctPath3, correctPath4, stylish));
});
