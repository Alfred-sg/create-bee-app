import { useState, createContext, useContext, useCallback } from 'react';
import { useFetch } from 'chaos-hooks';
import { getUserInfo } from '@/services/global';
import { IS_LOCAL, DEFAULT_USER } from '@/config';
import { UserInfo } from '@/types/global';

type USE_APP_OPTIONS = {
  transform?: (data: any) => UserInfo;
};

type APP = {
  userInfo: UserInfo;
  setUserInfo: (useInfo: UserInfo) => void;
  fetchUserInfo: (params: any) => any;
};

const INITIAL_USER = IS_LOCAL ? DEFAULT_USER : {};

/**
 * 顶层 hooks
 * @param options 
 */
export const useApp = (options: USE_APP_OPTIONS): APP => {
  const { transform } = options || {} as USE_APP_OPTIONS;
  const [ userInfo, _setUserInfo ] = useState<UserInfo>(INITIAL_USER);
  const setUserInfo = useCallback((userInfo: UserInfo) => {
    _setUserInfo(userInfo);
  }, []);

  const { fetch: fetchUserInfo  } = useFetch((params: any) => {
    return getUserInfo(params).then((res: any) => {
      if (res && res.success){
        setUserInfo(transform ? transform(res.data) : res.data);
      };
    });
  }, {
    manual: true
  });

  return {
    userInfo,
    setUserInfo,
    fetchUserInfo,
  };
};


export const AppContext = createContext<APP>({} as APP);
export const useAppContext = () => useContext(AppContext);
