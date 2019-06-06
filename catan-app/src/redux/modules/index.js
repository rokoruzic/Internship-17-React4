import { combineReducers } from "redux";
import road from "./road";
import player from "./player"
import settlement from "./settlement"


export default combineReducers({
  road,
  player,
  settlement
});
