import { useState, createContext, useContext, useCallback, useEffect } from 'react';
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

/**
 * 是否匹配路由
 * @param pathname 
 * @param routePath 
 */
export const match = (pathname: string, routePath: string) => {
  const pathnames = pathname.split('/').filter(item => !!item);
  const routePathnames = routePath.split('/').filter(item => !!item);
  let matched = true;

  if (pathnames.length >= routePathnames.length) {
    routePathnames.some((item, index) => {
      if (item[0] == ':') {
        // 匹配 id 的路由
        if (pathnames[index].match(/^\d+$/)) matched = true;
        else matched = false;
        return !matched;
      }

      if (item == pathnames[index]) matched = true;
      else matched = false;

      return !matched;
    })
  } else {
    matched = false;
  }

  return matched;
}

/**
 * 遍历
 * @param routes 
 * @param pathname 
 * @param result 
 */
export const getMatchedRoutes = (routes: Route[], pathname: string, result?: Route[]) => {
  if (!result) result = [];
  let temp: Route;

  routes.forEach(childRoute => {
    if (childRoute.path && match(pathname, childRoute.path)) {
      if (!temp || temp.path.length < childRoute.path.length) {
        temp = childRoute;
      }
    };
  });

  // @ts-ignore
  if (temp) {
    result.push(temp);
    if (temp.routes) {
      getMatchedRoutes(temp.routes, pathname, result);
    };
  };

  return result;
}

type USE_APP_OPTIONS = {
  pathname: string;// 当前路径
  transform?: (data: any) => UserInfo;
};

type APP = {
  userInfo: UserInfo;
  setUserInfo: (useInfo: UserInfo) => void;
  fetchUserInfo: (params: any) => any;
  menus: Menu[];
  routes: Route[];
  currentRoutes: Route[];// 当前路径所匹配的路由
  canAccess: (needAuthes: string[]) => boolean;// 判断权限
};

const INITIAL_USER = IS_LOCAL ? DEFAULT_USER : {};

/**
 * 顶层 hooks
 * @param routes 
 * @param options 
 */
export const useApp = (routes: Route[], options: USE_APP_OPTIONS): APP => {
  const { transform, pathname } = options || {} as USE_APP_OPTIONS;
  const [ userInfo, _setUserInfo ] = useState<UserInfo>(INITIAL_USER);
  const [ menus, setMenus ] = useState<Menu[]>(getMenus(routes, userInfo));
  const [ currentRoutes, setCurrentRoutes ] = useState<Route[]>([]);
  const setUserInfo = useCallback((userInfo: UserInfo) => {
    _setUserInfo(userInfo);
    setMenus(getMenus(routes, userInfo));
  }, [routes]);

  const { fetch: fetchUserInfo  } = useFetch((params: any) => {
    return getUserInfo(params).then((res: any) => {
      if (res && res.success){
        setUserInfo(transform ? transform(res.data) : res.data);
      };
    });
  }, {
    manual: true
  });

  useEffect(() => {
    setCurrentRoutes(getMatchedRoutes(routes, pathname));
  }, [pathname, routes]);

  return {
    userInfo,
    setUserInfo,
    fetchUserInfo,
    menus,
    routes,
    currentRoutes,
    canAccess: (needAuthes: string[]) => {
      if (userInfo && userInfo.authes){
        return !needAuthes.some(auth => {
          return !userInfo.authes || !userInfo.authes.includes(auth);
        })
      };

      return false;
    }
  };
};


export const AppContext = createContext<APP>({} as APP);
export const useAppContext = () => useContext(AppContext);