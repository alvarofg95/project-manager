const initialState = {
  token: null,
  nick: null,
  email: null
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
      console.log({ payload: action.payload });
      return Object.assign({}, state, action.payload);
    default:
      break;
  }
};

export default rootReducer;
