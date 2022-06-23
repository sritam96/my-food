const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  logHeapUsage: true,
  updateSnapshot: true,
  codeCoverage: true
};
