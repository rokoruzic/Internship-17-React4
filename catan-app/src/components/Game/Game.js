import React from "react";
import Players from "./Players/Players";
import Dice from "./Dice/Dice";
import Board from "./Board/Board";
import PlayerList from "./../Game/Players/PlayerList"
class Game extends  React.Component{
    render(){
        return(
            <div>
                <Players/>
                <Dice/>
                <Board/>
                <PlayerList/>
            </div>
        )
    }
}
export default Game;