import React from "react";
import Players from "./Players/Players";
import Dice from "./Dice/Dice";
class Game extends  React.Component{
    constructor(props){
        super(props)
    };
    render(){
        return(
            <div>
                <Players/>
                {/* <Dice/> */}
            </div>
        )
    }
}
export default Game;