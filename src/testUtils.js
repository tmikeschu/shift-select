const fileMatch = /\/([^/]*).spec.js$/;
const makeWithMethod = module => str =>
  `${module.filename.match(fileMatch)[1]}: ${str}`;

module.exports = {
  makeWithMethod,
};
