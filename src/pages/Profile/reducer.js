import { FAILED, LOADING, SUCCESS } from "./constants";

const initialState = {
  dataUser: {},
  isLoadingUser: false,
  isLoadingUpdate: false,
  message: "",
};

export default function reducer(state = initialState, action) {
  const { type, data, isLoading, key, message } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        message,
        [`isLoading${key}`]: false,
      };
    case LOADING:
      return {
        ...state,
        [`isLoading${key}`]: isLoading,
      };
    case SUCCESS:
      return {
        ...state,
        [`data${key}`]: data,
        [`isLoading${key}`]: false,
        message: "",
      };
    default:
      return state;
  }
}
