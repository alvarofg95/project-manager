const initialState = {
  token: null,
  userId: null
};

const update = (state, payload = {}) => {
  return Object.assign({}, state, payload);
};

const rootReducer = (state, action = '') => {
  switch (action.type) {
    case 'LOGIN':
      return update(state, {
        ...action.payload
      });
    case 'LOGOUT':
      return initialState;
    case 'LOADED_APP_INFO':
      return Object.assign({}, state, action.payload, { loadedAppInfo: true });
    default:
      break;
  }
};

export default rootReducer;
