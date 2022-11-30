import {
  SET_IS_LOADING,
} from '../constants/Gui';

export const setIsLoading = (isLoading) => {
  return {
    type: SET_IS_LOADING,
    isLoading
  }
};