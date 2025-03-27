function transformObjectIds(obj) {
  if (!obj || typeof obj !== "object") return obj;

  // Break circular references first
  const sanitizedObj = JSON.parse(JSON.stringify(obj));

  if (Array.isArray(sanitizedObj)) {
    return sanitizedObj.map((item) => transformObjectIds(item));
  }

  const result = {};
  for (const key in sanitizedObj) {
    if (key === "_id") {
      result.id = sanitizedObj[key];
    } else {
      result[key] = transformObjectIds(sanitizedObj[key]);
    }
  }
  return result;
}
module.exports = {
  transformObjectIds,
};
