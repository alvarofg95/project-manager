let cookiesService = null;

const logout = () => {
  try {
    localStorage.user = null;
  } catch (e) {
    console.log(e);
  }
  return (dispatch, getState) => {
    dispatch({
      type: 'LOGOUT'
    });
  };
};

const loginUser = ({ nick, email, token }) => {
  const tokenInfo = JSON.stringify({ token, nick, email });
  try {
    localStorage.user = tokenInfo;
  } catch (e) {
    console.log(e);
  }
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      payload: {
        token,
        nick,
        email
      }
    });
  };
};

const loadAppInfo = () => {
  return dispatch => {
    const appInfo = {};
    if (localStorage.user) {
      appInfo.token = JSON.parse(localStorage.user);
    }

    dispatch({ type: 'LOADED_APP_INFO', payload: { ...appInfo } });
  };
};

export default { loginUser, logout, loadAppInfo };
