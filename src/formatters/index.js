import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormatter = (formatName) => {
  if (formatName === 'plain') {
    return plain;
  }
  return stylish;
};

export default chooseFormatter;
