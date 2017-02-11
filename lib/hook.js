/* eslint-disable no-underscore-dangle */
const execa = require('execa');
const { resolve } = require('path');

module.exports = (configPath) => {
  require.extensions['.vue'] = (mod, filename) => {
    mod._compile(execa.sync(process.execPath, [
      resolve(__dirname, 'compiler'),
      configPath,
      filename,
    ]).stdout, filename);
  };
};
