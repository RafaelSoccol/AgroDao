import {
    UPDATE_USER
  } from '../constants/User';
  
  const initUser = {
    name: null,
    role: null
  };
  
  const user = (state = initUser, action) => {
    switch (action.type) {
      case UPDATE_USER:
        return {
          ...state,
          name: action.name,
          role: action.role,
        };
      default:
        return state;
    }
  };
  
  export default user