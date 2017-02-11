const _ = require('lodash');
const yargs = require('yargs');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MemoryFileSystem = require('memory-fs');
const { resolve } = require('path');

const componentExternals = _.curry((entry, context, request, done) => {
  if (request !== entry && !request.includes('!')) {
    done(null, `commonjs ${resolve(context, request)}`);
  } else {
    done();
  }
});

const run = (config, entry) => {
  const filename = 'output.js';
  const conf = Object.assign({}, config, {
    entry,
    output: {
      libraryTarget: 'commonjs',
      filename,
    },
    target: 'node',
    // Externalize everything except the entry.
    externals: [nodeExternals(), componentExternals(entry)],
    // Make sure Vue thinks its running in a "server"
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_ENV': JSON.stringify('server'),
      }),
    ].concat(config.plugins || []),
  });
  const compiler = webpack(conf);
  const fs = new MemoryFileSystem();
  compiler.outputFileSystem = fs;
  compiler.run((err, stats) => {
    if (err) throw err;
    fs.createReadStream(stats.compilation.assets[filename].existsAt, 'utf8').pipe(process.stdout);
  });
};

const args = yargs.argv._;

run(require(args[0]), args[1]); // eslint-disable-line import/no-dynamic-require
