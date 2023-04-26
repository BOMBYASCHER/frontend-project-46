import _ from 'lodash';
import { isObject } from '../index.js';

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
    '-1': 'was added with value:',
    '+1': 'was removed',
    different: 'was updated.',
  };
  const path = _.cloneDeep(mainPath);
  const iter = (data, status) => {
    const currentPath = path.reduce((acc, key) => {
      if (acc === '') {
        return `${key}`;
      }
      return `${acc}.${key}`;
    }, '');
    if (status === 'different') {
      return `Property '${currentPath}' ${strings[status]} From ${processValue(data[0])} to ${processValue(data[1])}`;
    }
    if (status === '+1') {
      return `Property '${currentPath}' ${strings[status]}`;
    }
    if (status === '-1') {
      return `Property '${currentPath}' ${strings[status]} ${processValue(data)}`;
    }
    const keyAndValue = Object.entries(data);
    const result = keyAndValue.map((elem) => {
      if (status === 'common') {
        if (isObject(elem[1])) {
          path.push(elem[0]);
          const string = iter(elem[1].data, elem[1].status);
          path.pop();
          if (string instanceof Array) {
            return [];
          }
          return string;
        }
        return [];
      }
      return [];
    });
    return result;
  };
  return iter(objectData, objectStatus);
};

const plain = (value) => {
  if (!(isObject(value))) {
    return `${value}`;
  }
  const iter = (object) => {
    const keyAndValue = Object.entries(object);
    const data = keyAndValue.flatMap((elem) => genString(elem[1].data, elem[1].status, [elem[0]]));
    const result = data.flat().reduce((acc, elem) => {
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
