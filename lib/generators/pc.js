const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');

const templatesPath = path.resolve(__dirname, '../../templates');

module.exports = (appName) => {
  const templatePath = path.resolve(templatesPath, 'pc');
  const appPath = path.resolve(process.cwd(), appName);
  const metaPath = path.resolve(appPath, 'meta.json');

  inquirer.prompt([{
    type: 'confirm',
    name: 'isAdmin',
    message: '是否后台管理系统',
    default: true,
  }]).then(({ isAdmin }) => {
    if (isAdmin){
      inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: '应用名称',
        default: '小青蛙',
      }, {
        type: 'input',
        name: 'companyName',
        message: '公司名称',
        default: '小青蛙科技有限公司',
      }, {
        type: 'input',
        name: 'siderTheme',
        message: '侧边栏风格',
        choices: ['dark', 'light'],
        default: 'dark'
      }, {
        type: 'list',
        name: 'breadcrumbsMode',
        message: '面包屑风格',
        choices: ['simple', 'complex'],
        default: 'complex'
      }, {
        type: 'confirm',
        name: 'enableLogin',
        message: '是否需要登录',
        default: true,
      }, {
        type: 'confirm',
        name: 'enableDebug',
        message: '是否启用调试模式',
        default: false,
      }]).then((meta) => {
        meta.isAdmin = true;
        doGenerate(meta);
      });
    } else {
      inquirer.prompt([{
        type: 'confirm',
        name: 'enableDebug',
        message: '是否启用调试模式',
        default: false,
      }]).then((meta) => {
        meta.isAdmin = false;
        doGenerate(meta);
      });
    }
  })

  const doGenerate = (meta) => {
    try {
      console.log(chalk.blue('项目正在创建中，请等待'));

      fs.mkdirSync(appPath);

      // shell.find 找到模板应用非 .umi、node_modules 文件或文件夹
      // 使用 * 不包含隐藏文件 https://blog.csdn.net/yockie/article/details/52872623
      const files = shell.find(`${templatePath}/.`)
          .filter(file => {
            return file !== templatePath && 
              !file.match(/\/\.umi$|\/\.umi\//) && 
              !file.match(/\/node_modules$|\/node_modules\//) && 
              !file.match(/\.DS_Store$/);
          });
          
      const templatePathLen = templatePath.split('/').length;
      files.forEach(src => {
        const names = src.split('/');
        const fileNames = names.slice(templatePathLen);
        const fileName = fileNames.join('/');

        const dest = appPath + '/' + fileName;
        if (fs.statSync(src).isDirectory()){
          fs.mkdirSync(dest);
        } else {
          console.log(chalk.green(`创建 ${fileName} 文件`));
          fs.copyFileSync(src, dest);
        }
      });
      fs.writeFileSync(metaPath, JSON.stringify(meta, undefined, 2), { encoding: 'utf8' });

      console.log(chalk.blue('项目创建完成，请查看'));
    } catch (e) {
      console.log(chalk.red(e));
    };
  }
}