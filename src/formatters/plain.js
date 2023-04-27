import _ from 'lodash';
import isObject from '../functions.js';

const isCopmlex = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const processValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return isCopmlex(value);
};

const callback = (acc, value, separator) => {
  if (acc === '') {
    return `${value}`;
  }
  return `${acc}${separator}${value}`;
};

const genString = (data, status, path) => {
  const strings = {
    added: 'was added with value:',
    removed: 'was removed',
    different: 'was updated.',
  };
  const currentPath = path.reduce((acc, key) => callback(acc, key, '.'), '');
  if (status === 'different') {
    return `Property '${currentPath}' ${strings[status]} From ${processValue(data[0])} to ${processValue(data[1])}`;
  }
  if (status === 'removed') {
    return `Property '${currentPath}' ${strings[status]}`;
  }
  if (status === 'added') {
    return `Property '${currentPath}' ${strings[status]} ${processValue(data)}`;
  }
  const keyAndValue = Object.entries(data);
  const result = keyAndValue.map((elem) => {
    if (status === 'common') {
      return genString(elem[1].data, elem[1].status, [...path, elem[0]]);
    }
    return [];
  });
  return result;
};

const plain = (object) => {
  const iter = (value) => {
    const keyAndValue = Object.entries(value);
    const data = keyAndValue.flatMap((elem) => genString(elem[1].data, elem[1].status, [elem[0]]));
    const result = data.flat(Infinity).reduce((acc, elem) => callback(acc, elem, '\n'), '');
    return `${result}`;
  };
  return iter(object);
};

export default plain;
