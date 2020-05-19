const meta = require('./meta.json');

const envTexts = {
  dev: '测试环境',
  prod: '线上环境',
};

const appUrls = {
  dev: "appUrlForDev",
  prod: "appUrlForProd"
};

const jenkinsUrls = {
  dev: "jenkinsUrlForDev",
  prod: "jenkinsUrlForProd"
};

module.exports = {
  dingtalk: {
    accessToken: "accessToken",
    secret: "secret",
    getTextContent({ env, branch }, err){
      return err ? {
        title: `${meta.title}${envTexts[env]}发布失败`,
        text: `请检查，或点击前往 jenkins 重新发布。\n错误内容：${err.message}`,
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584196130913&di=aa379191805328395a7e86211f92cb49&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F29%2F90%2F03573af86229ae7.jpg',
        messageUrl: jenkinsUrls[env],
      } : {
        title: `${meta.title}${envTexts[env]}发布成功`,
        text: `请点击访问！！！\n发布内容：${branch.message}`,
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584196175766&di=9c0c18c886ea80323fca6de157fd9833&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F52%2F93%2F395746b3d7c606e.jpg',
        messageUrl: appUrls[env],
      }
    }
  }
};