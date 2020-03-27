const inquirer = require('inquirer');
const generatePcProject = require('./generators/pc');
const generateH5Project = require('./generators/h5');

module.exports = (appName) => {
  inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: '请选择应用类型',
    choices: ['pc 桌面应用', 'h5 移动应用'],
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
      case 'h5':
        generateH5Project(appName);
        break;
    }
  });
}