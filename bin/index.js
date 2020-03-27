#!/usr/bin/env node

const { version } = require('../package.json');
const { program } = require('commander');

let appNameValue;

program
  .version(version)
  .arguments('<appName>')
  .action((appName) => {
    appNameValue = appName;
  });

program.parse(process.argv);

if (typeof appNameValue === 'undefined') {
  console.error('请指定应用文件夹名');
  process.exit(1);
} else {
  require('../lib/index.js')(appNameValue);
}
