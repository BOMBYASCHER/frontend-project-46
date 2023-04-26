const isObject = (object) => {
  if (object instanceof Object) {
    if (object !== null) {
      return true;
    }
  }
  return false;
};

export default isObject;
