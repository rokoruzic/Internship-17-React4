import React from "react";
import RandomNumber from "./DiceRandomizer"
import "./../Players/Players.css"
class Dice extends React.Component{
    constructor(props){
        super(props);
        this.state={isRolled:false}
    }
    handleClick=()=>{
        this.setState(state => ({
            
            isRolled:true
        }));
    }
    render(){
        const randomNumber = RandomNumber;
        var nesto = this.state.isRolled? <div >   {randomNumber()} </div> : <div></div>
        return(<div>
            <button onClick={this.handleClick}>ROLL DICE BRATKOTELO</button>
           {nesto} </div>)
    }
}
export default Dice