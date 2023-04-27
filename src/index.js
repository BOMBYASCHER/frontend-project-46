import _ from 'lodash';
import parseByFormat from './parsers.js';
import chooseFormatter from './formatters/index.js';
import isObject from './functions.js';

const getKeys = (object) => {
  if (isObject(object)) {
    return Object.keys(object);
  }
  return [];
};

const getKeyOfValue = (file, key) => {
  if (_.get(file, key)) {
    return file[key];
  }
  return [];
};

const getCommonKeys = (file1, file2) => {
  const fileKeys1 = getKeys(file1);
  const fileKeys2 = getKeys(file2);
  const commonKeys = _.union(fileKeys1, fileKeys2);
  if (commonKeys.length === 0) {
    return null;
  }
  const result = commonKeys.reduce((acc, key) => {
    const keyValue1 = getKeyOfValue(file1, key);
    const keyValue2 = getKeyOfValue(file2, key);
    return _.merge(acc, { [key]: getCommonKeys(keyValue1, keyValue2) });
  }, {});
  return result;
};

const getStatus = (firstFile, secondFile, key) => {
  if (!Object.hasOwn(firstFile, key)) {
    return 'added';
  }
  if (!Object.hasOwn(secondFile, key)) {
    return 'removed';
  }
  if (firstFile[key] === secondFile[key]) {
    return 'equals';
  }
  if (isObject(firstFile[key]) && isObject(secondFile[key])) {
    return 'common';
  }
  return 'different';
};

const getData = (file1, file2, key, status, func) => {
  if (status === 'added') {
    return file2[key];
  }
  if (status === 'removed' || status === 'equals') {
    return file1[key];
  }
  if (status === 'common') {
    return func(file1[key], file2[key]);
  }
  return [file1[key], file2[key]];
};

export const getDiff = (fileObject1, fileObject2) => {
  const file1 = _.cloneDeep(fileObject1);
  const file2 = _.cloneDeep(fileObject2);
  const commonObject = getCommonKeys(file1, file2);
  const commonKeys = Object.keys(commonObject);
  const result = _.sortBy(commonKeys).reduce((acc, key) => {
    const status = getStatus(file1, file2, key);
    const data = getData(file1, file2, key, status, getDiff);
    const object = { [key]: { status, data } };
    return _.merge(acc, object);
  }, {});
  return result;
};

const genDiff = (filepath1, filepath2, format) => {
  const file1 = parseByFormat(filepath1);
  const file2 = parseByFormat(filepath2);
  const result = getDiff(file1, file2);
  const formatter = chooseFormatter(format);
  return formatter(result);
};

export default genDiff;
