import { FAILED, LOADING } from "./constants";

const initialState = {
  isLoading: false,
  message: "",
};

export default function reducer(state = initialState, action) {
  const { type, isLoading, message } = action;

  switch (type) {
    case FAILED:
      return {
        ...state,
        message,
      };

    case LOADING:
      return {
        ...state,
        isLoading,
      };

    default:
      return state;
  }
}
