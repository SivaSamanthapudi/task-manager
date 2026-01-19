function simplifiedErrors(errors) {
  const result = {};
  for (const field in errors) {
    result[field] = errors[field].message;
  }
  return result;
}

// Ensure it is exported as an object property
module.exports = { simplifiedErrors };