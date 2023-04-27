import chooseFormatter from '../src/formatters/index.js';
import json from '../src/formatters/json.js';
import plain from '../src/formatters/plain.js';
import stylish from '../src/formatters/stylish.js';

test('Check choose formatter', () => {
  const actual1 = 'plain';
  expect(chooseFormatter(actual1)).toEqual(plain);

  const actual2 = 'json';
  expect(chooseFormatter(actual2)).toEqual(json);

  const actual3 = undefined;
  expect(chooseFormatter(actual3)).toEqual(stylish);
});
