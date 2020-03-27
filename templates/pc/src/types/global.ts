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

/**
 * 响应
 */
export interface Response {
  code: number;
  data: any;
  success: boolean;
  errorMessage?: string;
};

/**
 * 分页响应
 */
export interface PageData {
  list: any[];
  total: number;
  pageSize: number;
  current: number;
};

/**
 * 分页响应
 */
export interface PageResponse extends Response {
  data: PageData;
};
