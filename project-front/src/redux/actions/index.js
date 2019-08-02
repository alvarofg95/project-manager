let cookiesService = null;

const logout = () => {
  const minutes = 30;
  let cookieExpirationTime = new Date('01/01/2000');
  cookieExpirationTime.setTime(cookieExpirationTime.getTime() + 1000 * 60 * minutes);

  try {
    cookiesService.set('userIdInfo', '', {
      path: '/',
      expires: cookieExpirationTime
    });
    cookiesService.set('tokenInfo', '', {
      path: '/',
      expires: cookieExpirationTime
    });
  } catch (e) {
    console.log(e);
  }
  return (dispatch, getState) => {
    dispatch({
      type: 'LOGOUT'
    });
  };
};

const loginUser = (userId, token) => {
  const encondedUserIdString = btoa(userId);
  const encondedTokenString = btoa(token);
  const minutes = 30;
  let cookieExpirationTime = new Date();
  cookieExpirationTime.setTime(cookieExpirationTime.getTime() + 1000 * 60 * minutes);

  try {
    cookiesService.set('userIdInfo', encondedUserIdString, {
      path: '/',
      expires: cookieExpirationTime
    });
    cookiesService.set('tokenInfo', encondedTokenString, {
      path: '/',
      expires: cookieExpirationTime
    });
  } catch (e) {
    console.log(e);
  }
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      payload: {
        token
      }
    });
  };
};

const loadAppInfo = cookies => {
  return dispatch => {
    if (!cookiesService) {
      cookiesService = cookies;
    }
    const encondedTokenString = cookiesService.get('tokenInfo');
    const encondedUserIdString = cookiesService.get('userIdInfo');
    let decodedCookieString = '';
    let decodedCookieUserIdString = '';
    let appInfo = {};
    if (encondedTokenString && encondedUserIdString) {
      decodedCookieString = atob(encondedTokenString);
      decodedCookieUserIdString = atob(encondedUserIdString);
      appInfo = {
        ...appInfo,
        token: decodedCookieString,
        userId: decodedCookieUserIdString,
      };
    }
    dispatch({ type: 'LOADED_APP_INFO', payload: appInfo });
  };
};

export default { loginUser, logout, loadAppInfo };
