import React from "react";
import RandomNumber from "./DiceRandomizer"
class Dice extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const randomNumber = RandomNumber;
        return(<div>{randomNumber()}</div>)
    }
}
export default Dice