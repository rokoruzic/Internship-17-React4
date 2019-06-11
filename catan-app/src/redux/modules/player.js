import RoadCoords from "./../../constants/RoadCoords";
import SettlementCoords from "./../../constants/SettlementCoords";
// action types
const ADD_PLAYER = "ADD_PLAYER";
const EDIT_PLAYER_POINTS = "EDIT_PLAYER_POINTS";
const SET_PLAYER_TURN = "SET_PLAYER_TURN";
const SUBSTRACT_PLAYER_CARDS = "SUBSTRACT_PLAYER_CARDS";
const ADD_PLAYER_CARDS = "ADD_PLAYER_CARDS";
const EDIT_PLAYER_TURN = "EDIT_PLAYER_TURN";
const EDIT_PLAYER_FIRST_CLICK = "EDIT_PLAYER_FIRST_CLICK";
const EDIT_PLAYER_FIRST_CLICK_ROAD = "EDIT_PLAYER_FIRST_CLICK_ROAD";
const EDIT_PLAYER_SECOND_CLICK = "EDIT_PLAYER_SECOND_CLICK";
const EDIT_PLAYER_SECOND_CLICK_ROAD = "EDIT_PLAYER_SECOND_CLICK_ROAD";
const UPDATE_PLAYERS = "UPDATE_PLAYERS";
const BUY_ROAD="BUY_ROAD";
const BUY_SETTLEMENT = "BUY_SETTLEMENT";
// initial state
const initialState = {
  players: [],
  playerTurnId: 0,
  materialCost: {}
};

// action creators
export const setPlayerTurn = payload => dispatch => {
  dispatch({
    type: SET_PLAYER_TURN,
    payload
  });
};
export const buyRoad = payload => dispatch => {
  dispatch({
    type: BUY_ROAD,
    payload
  });
};
export const buySettlement = payload => dispatch => {
  dispatch({
    type: BUY_SETTLEMENT,
    payload
  });
};
export const updatePlayers = payload => dispatch => {
  dispatch({
    type: UPDATE_PLAYERS,
    payload
  });
};

export const editPlayerTurn = () => dispatch => {
  dispatch({
    type: EDIT_PLAYER_TURN
  });
};
export const editPlayerFirstClick = () => dispatch => {
  dispatch({
    type: EDIT_PLAYER_FIRST_CLICK
  });
};
export const editPlayerFirstClickRoad = () => dispatch => {
  dispatch({
    type: EDIT_PLAYER_FIRST_CLICK_ROAD
  });
};
export const editPlayerSecondClick = () => dispatch => {
  dispatch({
    type: EDIT_PLAYER_SECOND_CLICK
  });
};
export const editPlayerSecondClickRoad = () => dispatch => {
  dispatch({
    type: EDIT_PLAYER_SECOND_CLICK_ROAD
  });
};
export const addPlayer = payload => dispatch => {
  dispatch({
    type: ADD_PLAYER,
    payload
  });
};
export const editPlayerPoints = payload => dispatch => {
  dispatch({
    type: EDIT_PLAYER_POINTS,
    payload
  });
};
export const substractPlayerCards = payload => dispatch => {
  dispatch({
    type: SUBSTRACT_PLAYER_CARDS,
    payload
  });
};

export const addPlayerCards = payload => dispatch => {
  dispatch({
    type: ADD_PLAYER_CARDS,
    payload
  });
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_SETTLEMENT:
    let playersUpdatedResourcesForSettlement = [...state.players]
    let playerToEditResourcesForSettlement = playersUpdatedResourcesForSettlement.find(x => x.id === state.playerTurnId);
    playerToEditResourcesForSettlement.brick-=1;
    playerToEditResourcesForSettlement.lumber-=1;
    playerToEditResourcesForSettlement.grain-=1;
    playerToEditResourcesForSettlement.wool-=1;

    return Object.assign({}, state, {
      players: playersUpdatedResourcesForSettlement
    });

    case BUY_ROAD:
    let playersUpdatedResources = [...state.players]
    let playerToEditResources = playersUpdatedResources.find(x => x.id === state.playerTurnId);
    playerToEditResources.brick-=1;
    playerToEditResources.lumber-=1;
    return Object.assign({}, state, {
      players: playersUpdatedResources
    });

    
    case UPDATE_PLAYERS:
    let updatedPlayers = [...state.players]
    return Object.assign({}, state, {
      players: updatedPlayers
    });
    case ADD_PLAYER:
      return Object.assign({}, state, {
        players: state.players.concat(action.payload)
      });

    case EDIT_PLAYER_POINTS:
      let players = [...state.players];
      var playerToEdit = players.find(x => x.id === state.playerTurnId);
      playerToEdit.points += action.payload;
      return Object.assign({}, state, {
        players: players
      });
    case EDIT_PLAYER_FIRST_CLICK:
      let playersFirstClick = [...state.players];
      var playerFirstClickToEdit = playersFirstClick.find(
        x => x.id === state.playerTurnId
      );
      playerFirstClickToEdit.firstClick = true;
      return Object.assign({}, state, {
        players: playersFirstClick
      });

    case EDIT_PLAYER_FIRST_CLICK_ROAD:
      let playersFirstClickRoad = [...state.players];
      var playerFirstClickRoadToEdit = playersFirstClickRoad.find(
        x => x.id === state.playerTurnId
      );
      playerFirstClickRoadToEdit.firstClickRoad = true;
      return Object.assign({}, state, {
        players: playersFirstClickRoad
      });

    case EDIT_PLAYER_SECOND_CLICK:
      let allPlayers = [...state.players];
      var playerSecondClickToEdit = allPlayers.find(
        x => x.id === state.playerTurnId
      );
      playerSecondClickToEdit.secondClick = true;
      return Object.assign({}, state, {
        players: allPlayers
      });

    case EDIT_PLAYER_SECOND_CLICK_ROAD:
      let allPlayers2 = [...state.players];
      var playerSecondClickRoadToEdit = allPlayers2.find(
        x => x.id === state.playerTurnId
      );
      playerSecondClickRoadToEdit.secondClickRoad = true;
      return Object.assign({}, state, {
        players: allPlayers2
      });

    case EDIT_PLAYER_TURN:
      let playersList1 = [...state.players];
      var playerTurnToEdit = playersList1.find(
        x => x.id === state.playerTurnId
      );
      playerTurnToEdit.turn += 1;
      return Object.assign({}, state, {
        players: playersList1
      });

    case SET_PLAYER_TURN:
      return {
        ...state,
        playerTurnId: action.payload
      };

    case ADD_PLAYER_CARDS:
      return {};

    case SUBSTRACT_PLAYER_CARDS:
      let playersList = [...state.players];
      var playerToEdit = playersList.find(x => x.id === state.playerTurnId);
      playerToEdit.grain -= 1;
      playerToEdit.lumber -= 1;
      playerToEdit.wool -= 1;
      playerToEdit.brick -= 1;
      return Object.assign({}, state, {
        players: playersList
      });

    default:
      return state;
  }
};

export default reducer;
