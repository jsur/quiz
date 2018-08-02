const chai = require('chai');
const { expect } = chai;
const { deepClone } = require('./deepClone');

describe('deepClone', () => {

  let testObj;
  let clone;
  beforeEach(() => {
    testObj = {
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
          inner2: 'testing',
          evenDeeperInner: {
            veryInner1: 'hello',
            veryInner2: 'here we are'
          }
        }
      }
    }
    clone = deepClone(testObj);
  });

  it('Should return an empty object when given no parameters', () => {
    const clone = deepClone();
    expect(clone).to.deep.equal({});
  });
  it('Should return an empty object when given wrong input', () => {
    const clone = deepClone([]);
    expect(clone).to.deep.equal({});
  });
  it('Should return a deep clone of the given object', () => {
    expect(clone).to.deep.equal(testObj); 
  });
  it('Should keep clone object arrays as type Array', () => {
    expect(clone.test.arr).to.be.an('array');
  });
  it('Should keep clone object booleans as booleans', () => {
    expect(typeof clone.test.bool).to.equal('boolean');
  });
  it('Should keep clone object nulls as nulls', () => {
    expect(clone.test.nullVal).to.equal(null);
  });
  it('Should keep clone object undefineds as undefineds', () => {
    expect(clone.test.undefVal).to.equal(undefined);
  });
  it('Should keep clone object dates as valid dates', () => {
    expect(typeof clone.test.dateVal.getMonth).to.equal('function');
  });
  it('Should keep clone object methods callable', () => {
    expect(clone.test.funcVal()).to.equal('I am a function');
  });
  it('Should keep clone object symbols as symbols', () => {
    expect(typeof clone.test.symbolVal).to.equal('symbol');
  });
});