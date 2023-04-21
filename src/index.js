import _ from 'lodash';
import parseByFormat from './parsers.js';

export const isObject = (object) => {
  if (object instanceof Object) {
    if (object !== null) {
      return true;
    }
  }
  return false;
};

const getKeys = (object) => {
  if (isObject(object)) {
    return Object.keys(object);
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
  const result = commonKeys.sort().reduce((acc, key) => {
    let keyValue1;
    let keyValue2;
    if (_.get(file1, key)) {
      keyValue1 = file1[key];
    } else {
      keyValue1 = [];
    }
    if (_.get(file2, key)) {
      keyValue2 = file2[key];
    } else {
      keyValue2 = [];
    }
    acc[key] = getCommonKeys(keyValue1, keyValue2);
    return acc;
  }, {});
  return result;
};

const genDiff = (filepath1, filepath2) => {
  const fileFirst = parseByFormat(filepath1);
  const fileSecond = parseByFormat(filepath2);
  const getDiff = (fileObject1, fileObject2) => {
    const file1 = _.cloneDeep(fileObject1);
    const file2 = _.cloneDeep(fileObject2);
    const commonObject = getCommonKeys(file1, file2);
    const commonKeys = Object.keys(commonObject);
    const result = commonKeys.sort().reduce((acc, key) => {
      const object = { status: undefined, data: undefined };
      if (!Object.hasOwn(file1, key)) {
        object.status = '-1';
        object.data = file2[key];
        acc[key] = object;
        return acc;
      }
      if (!Object.hasOwn(file2, key)) {
        object.status = '+1';
        object.data = file1[key];
        acc[key] = object;
        return acc;
      }
      if (file1[key] === file2[key]) {
        object.status = 'equals';
        object.data = file1[key];
        acc[key] = object;
        return acc;
      }
      if (isObject(file1[key]) && isObject(file2[key])) {
        object.status = 'common';
        object.data = getDiff(file1[key], file2[key]);
        acc[key] = object;
        return acc;
      }
      object.status = 'different';
      object.data = [file1[key], file2[key]];
      acc[key] = object;
      return acc;
    }, {});
    return result;
  };
  return getDiff(fileFirst, fileSecond);
};

export default genDiff;
