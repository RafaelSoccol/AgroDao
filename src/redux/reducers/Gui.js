import { SET_IS_LOADING } from 'redux/constants/Gui';

const initGui = {
  isLoading: false
};

const gui = (state = initGui, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default gui