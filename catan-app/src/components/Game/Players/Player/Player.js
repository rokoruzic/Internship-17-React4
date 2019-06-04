import React from "react";
class Player extends React.Component{
    constructor(props){
        super(props)
    };
    render(){

        var styleColor = {color:this.props.color}
        return(<>
        <li style={styleColor} key = {this.props.id}>
        {this.props.name} {this.props.id} 
        </li>
        </>)
    }
}
export default Player;