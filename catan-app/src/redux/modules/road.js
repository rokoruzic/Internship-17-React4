// action types
const APPLY_ROAD = "APPLY_ROAD";
const SHOW_ERROR = "SHOW_ERROR";

// initial state
const initialState = {
  id:5,
};

// action creators
export const APPLY_ROAD = () => {
  return {
    type: APPLY_ROAD,
  };
};

export const SHOW_ERROR = (message) => {
  return {
    type: SHOW_ERROR,
    message:message
  };
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_ROAD:
      return {
        ...state,
        isVisible: true,
        message: action.message
      };
    case HIDE_ERROR:
      return {
        ...state,
        isVisible: false,
        message: ""
      };
    default:
      return state;
  }
};

export default reducer;
