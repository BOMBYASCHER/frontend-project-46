import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormatter = (formatName) => {
  if (formatName === 'plain') {
    return plain;
  }
  if (formatName === 'json') {
    return stylish;
  }
  return stylish;
};

export default chooseFormatter;
