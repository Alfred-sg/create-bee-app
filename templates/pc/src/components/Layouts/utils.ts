import { Route } from '@/types/global';

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
        if (pathnames[index].match(/[0-9]+/)) matched = true;
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

export const matchLength = (pathname: string, routePath: string) => {
  const pathnames = pathname.split('/').filter(item => !!item);
  const routePathnames = routePath.split('/').filter(item => !!item);
  return pathnames.length === routePathnames.length;
}

/**
 * 遍历
 * @param routes 
 * @param pathname 
 * @param result 
 */
export const getMatchedRoutes = (routes: Route[], pathname: string, result: Route[] = []) => {
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
    result = [...result, temp];
    if (temp.routes) {
      getMatchedRoutes(temp.routes, pathname, result);
    };
  };

  return result;
}
