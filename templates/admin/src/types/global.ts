/**
 * 菜单
 */
export type Menu = {
  path: string;
  component?: string;
  title: string;
  icon?: string;
  routes?: Menu[];
};

/**
 * 路由
 */
export type Route = {
  path: string;
  component: string;
  authes?: string[];// 需要的权限
  menu?: boolean;
  title?: string;
  icon?: string;
  routes?: Route[];
  pathname?: string;// 内部面包屑处理时设置
};

/**
 * 用户信息
 */
export type UserInfo = {
  name?: string;
  authes?: string[];// 包含的权限
  [key: string]: any;
};