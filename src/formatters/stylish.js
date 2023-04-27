import isObject from '../functions.js';

const genString = (value, replacer, spacesCount, deep) => {
  if (!(isObject(value))) {
    return `${value}`;
  }
  const iter = (object, sub, indent, depth) => {
    const keyAndValue = Object.entries(object);
    const data = keyAndValue.map((elem) => {
      if (isObject(elem[1])) {
        return `${elem[0]}: ${iter(elem[1], sub, indent, depth + 1)}`;
      }
      return `${elem[0]}: ${elem[1]}`;
    });
    const result = data.reduce((acc, elem) => `${acc}\n${sub.repeat(depth * indent + indent)}${elem}`, '{');
    return `${result}\n${sub.repeat(depth * indent)}}`;
  };
  return iter(value, replacer, spacesCount, deep);
};

const indentByStatus = {
  added: '+ ',
  removed: '- ',
  equals: '  ',
};

const stylish = (object, replacer = ' ', spacesCount = 4) => {
  const iter = (value, sub, indent, depth) => {
    const keyAndValue = Object.entries(value);
    const data = keyAndValue.map((elem) => {
      if (elem[1].status === 'common') {
        return `  ${elem[0]}: ${iter(elem[1].data, sub, indent, depth + 1)}`;
      }
      if (elem[1].status === 'different') {
        const data1 = `- ${elem[0]}: ${genString(elem[1].data[0], sub, indent, depth)}`;
        const data2 = `+ ${elem[0]}: ${genString(elem[1].data[1], sub, indent, depth)}`;
        return `${data1}\n${sub.repeat(depth * indent - 2)}${data2}`;
      }
      const string = `${elem[0]}: ${genString(elem[1].data, sub, indent, depth)}`;
      return `${indentByStatus[elem[1].status]}${string}`;
    });
    const result = data.reduce((acc, elem) => `${acc}\n${sub.repeat(depth * indent - 2)}${elem}`, '{');
    return `${result}\n${sub.repeat(depth * indent - indent)}}`;
  };
  return iter(object, replacer, spacesCount, 1);
};

export default stylish;
