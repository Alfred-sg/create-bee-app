const inquirer = require('inquirer');
const generatePcProject = require('./generators/pc');

module.exports = (appName) => {
  inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: '请选择应用类型',
    choices: ['pc 桌面应用'],
    filter(val) {
      return val.split(' ')[0];
    }
  }]).then(({
    type
  }) => {
    switch(type){
      case 'pc':
        generatePcProject(appName);
        break;
    }
  });
}