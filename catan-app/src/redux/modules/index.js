import { combineReducers } from "redux";
import road from "./road";
import player from "./player"
import settlement from "./settlement";
import game from "./game"


export default combineReducers({
  road,
  player,
  settlement,
  game
});
