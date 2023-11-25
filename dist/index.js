function mapObject(target, mapFunction) {
  return Object.entries(target).reduce((carry, [key, value], index, array) => {
    carry[key] = mapFunction(value, key, array);
    return carry;
  }, {});
}
async function mapObjectAsync(target, mapFunction) {
  const entries = Object.entries(target);
  const promises = entries.map(async ([key, value]) => {
    const newValue = await mapFunction(value, key, target);
    return [key, newValue];
  });
  const results = await Promise.all(promises);
  return results.reduce((carry, [key, value]) => {
    carry[key] = value;
    return carry;
  }, {});
}
function mapMap(target, mapFunction) {
  return [...target.entries()].reduce((carry, [key, value], index, array) => {
    carry.set(key, mapFunction(value, key, array));
    return carry;
  }, /* @__PURE__ */ new Map());
}

export { mapMap, mapObject, mapObjectAsync };
