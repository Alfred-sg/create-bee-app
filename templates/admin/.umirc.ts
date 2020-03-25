import { IConfig } from 'umi-types';
import execa from 'execa';
import { appMetaData } from './package.json';

const { NODE_ENV, DEPLOY_ENV } = process.env;

const define = {
  "process.env.DEPLOY_ENV": DEPLOY_ENV == 'prod' ? 'prod' : 'dev',
  "process.env.DEPLOY_ENV_NAME": DEPLOY_ENV == 'prod' ? '线上环境' : 
    NODE_ENV == 'production' ? '测试环境' : '开发环境',
};

try {
  const { stdout } = execa.commandSync('git branch -v');
  const currentBranch = stdout.split(/\n/).find(b => b[0] === '*')
  const matched = currentBranch
    .slice(2, currentBranch.length).match(/(\(.*\))|(\[.*\])|([^\s\[\]\(\)]*)/g);
    
  define['process.env.GIT_BRANCH_NAME'] = matched[1].trim();
  define['process.env.GIT_COMMIT_HASH'] = matched[2].trim();
  define['process.env.GIT_COMMIT_MESSAGE'] = matched[3].trim();
} catch(err){
  console.log('请检查是否 git 工程')
}

// ref: https://umijs.org/config/
const config: IConfig =  {
  history: process.env.NODE_ENV !== 'production' ? 'hash' : undefined,
  publicPath: `https://sz-gmjkzqoss.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/fyxt/pc/${DEPLOY_ENV}/`,
  treeShaking: true,
  targets: { chrome: 58, ie: 9, },
  sass: {},
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      title: 'admin',
      dll: false,
      locale: {
        enable: true,
        default: 'zh-CN',
      },
      routes: {
        exclude: [ /components\//, ],
      },
    }],
  ],
  extraBabelPlugins: [
    // 'transform-runtime',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
  ],
  externals: NODE_ENV !== 'production' ? undefined : {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    'react-router-dom': 'window.ReactRouterDOM',
  },
  chainWebpack(config){
    config.output.chunkFilename(`[name].[hash].async.js`);
    config.plugin('extract-css').tap(() => {
      return [
        {
          filename: `[name].css`,
          chunkFilename: `[name].[hash].chunk.css`,
          ignoreOrder: true,
        },
      ];
    });
  },
  proxy: {
    '/api': {
      target: 'http://test/',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/403', component: '../pages/403' },
        { path: '/404', component: '../pages/404' },
        { path: '/500', component: '../pages/500' },
        appMetaData.enableLogin ? { path: '/login', component: '../pages/login' } : undefined,
        { path: '/', component: '../pages/index', menu: true, title: '首页' }
      ].filter(route => !!route)
    }
  ],
}

export default config;
