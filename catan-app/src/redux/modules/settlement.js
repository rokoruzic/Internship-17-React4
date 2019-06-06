import RoadCoords from "./../../constants/RoadCoords";
import SettlementCoords from "./../../constants/SettlementCoords";
// action types
const ADD_PLAYER = "ADD_PLAYER";
const EDIT_PLAYER_POINTS = "EDIT_PLAYER_POINTS"
const SET_PLAYER_TURN = "SET_PLAYER_TURN"
const SUBSTRACT_PLAYER_CARDS= "SUBSTRACT_PLAYER_CARDS"
const ADD_PLAYER_CARDS = "ADD_PLAYER_CARDS"
const CREATE_SETTLEMENT = "CREATE_SETTLEMENT"

// initial state
const initialState = {
  settlements :[{}]
};

// action creators
export const createSettlement = (payload)=>dispatch=>{
    dispatch({
        type:CREATE_SETTLEMENT,payload
    })
}

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE_SETTLEMENT:
    return Object.assign({}, state, {
      settlements: state.settlements.concat(action.payload)
    });
    
    default:
      return state;

  }
};

export default reducer;
