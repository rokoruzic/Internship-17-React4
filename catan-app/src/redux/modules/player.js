import RoadCoords from "./../../constants/RoadCoords";
import SettlementCoords from "./../../constants/SettlementCoords";
// action types
const ADD_PLAYER = "ADD_PLAYER";
const EDIT_PLAYER_POINTS = "EDIT_PLAYER_POINTS"
const SET_PLAYER_TURN = "SET_PLAYER_TURN"
const SUBSTRACT_PLAYER_CARDS= "SUBSTRACT_PLAYER_CARDS"
const ADD_PLAYER_CARDS = "ADD_PLAYER_CARDS"

// initial state
const initialState = {
  players:[],
  playerTurnId:0,
  materialCost:{}
};

// action creators
export const setPlayerTurn = (payload)=>dispatch=>{
    dispatch({
        type:SET_PLAYER_TURN,payload
    })
}
export const addPlayer = (payload)=> dispatch =>{

  dispatch({
    type: ADD_PLAYER,payload
  });
};
export const editPlayerPoints = (payload) =>dispatch=>{

    dispatch({
        type:EDIT_PLAYER_POINTS,payload
    });
};
export const substractPlayerCards = (payload) =>dispatch=>{
    dispatch({
        type:SUBSTRACT_PLAYER_CARDS,payload
    })
}

export const addPlayerCards = (payload) =>dispatch=>{
    dispatch({
        type:ADD_PLAYER_CARDS,payload
    })
}


// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
   
    case ADD_PLAYER:
      return Object.assign({}, state, {
        players: state.players.concat(action.payload)
      });

      case EDIT_PLAYER_POINTS:
        let players = [...state.players];
        var playerToEdit = players.find(x=>x.id===state.playerTurnId)
        playerToEdit.points += action.payload;
        return Object.assign({}, state, {
            players:players
        });


      case SET_PLAYER_TURN:
        return {
            ...state,
            playerTurnId:action.payload
        }

        case ADD_PLAYER_CARDS:
        return{

        }


        case SUBSTRACT_PLAYER_CARDS:
        let playersList = [...state.players];
        var playerToEdit = playersList.find(x=>x.id===state.playerTurnId)
        playerToEdit.grain-=1;
        playerToEdit.lumber-=1;
        playerToEdit.wool-=1;
        playerToEdit.brick-=1;
        return Object.assign({}, state, {
            players:playersList
        });



    default:
      return state;

  }
};

export default reducer;
