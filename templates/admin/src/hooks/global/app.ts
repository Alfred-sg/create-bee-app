import { useState, createContext, useContext, useCallback } from 'react';
import { useFetch } from 'chaos-hooks';
import { getUserInfo } from '@/services/global';
import { IS_LOCAL, DEFAULT_USER } from '@/config';
import { Route, Menu, UserInfo } from '@/types/global';

/**
 * 获取展示菜单
 * @param routes 
 * @param useInfo 
 */
const getMenus = (routes: Route[], useInfo: UserInfo) => {
  /**
   * 是否拥有菜单访问权限
   * @param authes 
   */
  const hasRight = (authes?: string[]) => {
    return authes ? authes.some((auth) => {
      return useInfo && useInfo.authes ? !useInfo.authes.includes(auth) : false;
    }) : true;
  };

  const traverse = (routes: Route[]): Menu[] => {
    return routes
      .filter(route => route.menu && route.title)
      .filter(route => {
        return useInfo && useInfo.authes ? hasRight(route.authes) : 
          !route.authes || !route.authes.length;
      })
      .map(route => {
        const { path, component, title, icon, routes } = route;
        return {
          path,
          component,
          title,
          icon,
          routes: routes ? traverse(routes) : routes,
        };
      }) as Menu[];
  }

  return traverse(routes);
};

type USE_APP_OPTIONS = {
  transform: (data: any) => UserInfo;
};

type APP = {
  userInfo: UserInfo;
  setUserInfo: (useInfo: UserInfo) => void;
  fetchUserInfo: (params: any) => any;
  menus: Menu[];
  routes: Route[];
};

const INITIAL_USER = IS_LOCAL ? DEFAULT_USER : {};

/**
 * 顶层 hooks
 * @param routes 
 * @param options 
 */
export const useApp = (routes: Route[], options?: USE_APP_OPTIONS): APP => {
  const { transform } = options || {} as USE_APP_OPTIONS;
  const [ userInfo, _setUserInfo ] = useState<UserInfo>(INITIAL_USER);
  const [ menus, setMenus ] = useState<Menu[]>(getMenus(routes, userInfo));
  const setUserInfo = useCallback((userInfo: UserInfo) => {
    _setUserInfo(userInfo);
    setMenus(getMenus(routes, userInfo));
  }, [routes]);

  const { fetch: fetchUserInfo  } = useFetch((params: any) => {
    return getUserInfo(params).then((res: any) => {
      if (res && res.success){
        setUserInfo(transform ? transform(res.data) : res.data);
      };
    }).catch(() => {});
  }, {
    manual: true
  });

  return {
    userInfo,
    setUserInfo,
    fetchUserInfo,
    menus,
    routes,
  };
};


export const AppContext = createContext<APP>({} as APP);
export const Provider = AppContext.Provider;
export const useAppContext = () => useContext(AppContext);