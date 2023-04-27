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

const genString = (objectData, objectStatus, mainPath) => {
  const strings = {
    added: 'was added with value:',
    removed: 'was removed',
    different: 'was updated.',
  };
  const iter = (data, status, path) => {
    const currentPath = path.reduce((acc, key) => {
      if (acc === '') {
        return `${key}`;
      }
      return `${acc}.${key}`;
    }, '');
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
        if (isObject(elem[1])) {
          const string = iter(elem[1].data, elem[1].status, [...path, elem[0]]);
          return string;
        }
      }
      return [];
    });
    return result;
  };
  return iter(objectData, objectStatus, mainPath);
};

const plain = (value) => {
  if (!(isObject(value))) {
    return `${value}`;
  }
  const iter = (object) => {
    const keyAndValue = Object.entries(object);
    const data = keyAndValue.flatMap((elem) => genString(elem[1].data, elem[1].status, [elem[0]]));
    const result = data.flat(Infinity).reduce((acc, elem) => {
      if (acc === '') {
        return `${elem}`;
      }
      return `${acc}\n${elem}`;
    }, '');
    return `${result}`;
  };
  return iter(value);
};

export default plain;
