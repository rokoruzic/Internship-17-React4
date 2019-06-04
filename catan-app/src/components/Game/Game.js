import React from "react";
import Player from "./Players";
import Dice from "./Dice";
class Game extends  React.Component{
    constructor(props){
        super(props)
    };
    render(){
        return(
            <div>
                <Player/>
                {/* <Dice/> */}
            </div>
        )
    }
}
export default Game;