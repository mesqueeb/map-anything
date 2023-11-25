'use strict';

function mapObject(target, mapFunction) {
  return Object.entries(target).reduce((carry, [key, value], index, array) => {
    carry[key] = mapFunction(value, key, array);
    return carry;
  }, {});
}
function mapMap(target, mapFunction) {
  return [...target.entries()].reduce((carry, [key, value], index, array) => {
    carry.set(key, mapFunction(value, key, array));
    return carry;
  }, /* @__PURE__ */ new Map());
}

exports.mapMap = mapMap;
exports.mapObject = mapObject;
