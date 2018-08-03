/*

Write a function called deepClone which takes an object and creates a copy of it. 
e.g. {name: "Paddy", address: {town: "Lerum", country: "Sweden"}} -> 
{
  name: "Paddy",
  address: {
      town: "Lerum",
      country: "Sweden"
    }
}

*/

const obj = {
  name: "Paddy",
  address: {
    town: "Lerum",
    country: "Sweden",
  },
  test: {
    stringVal: 'hehe',
    arr: [1, 2, 3],
    bool: false,
    nullVal: null,
    undefVal: undefined,
    dateVal: new Date(),
    symbolVal: Symbol('test'),
    funcVal: function testFunc() { return 'I am a function' },
    deepInner: {
      inner1: 123,
      inner2: 'testing'
    }
  }
}

function deepClone(obj = {}) {
  const returnObj = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (
      value &&
      typeof value === 'object' &&
      value.constructor === 'Object'
    ) {
      returnObj[key] = deepClone(value);
    } else {
      returnObj[key] = value;
    }
  });
  return returnObj;
}

console.log(deepClone(obj));

module.exports = {
  deepClone
}