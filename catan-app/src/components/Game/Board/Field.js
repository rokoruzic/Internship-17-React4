import React from "react";
import "./Board.css";
import Settlement from "./Settlement";
import Road from "./Road";

class Field extends React.Component{
    constructor(props){
        super(props)

    };
    render(){
        return(<div>


                    <div className="field">
                    <div>
                        <div className="hex-top" style={{ borderBottomColor: 'red' }} />
                        <div className="hex-middle" style={{ backgroundColor: 'red' }} />
                        <div className="hex-bottom" style={{ borderTopColor: 'red' }} />
                    </div>
                    <Road className="road road-top-right" id={0}/>
                    <Road className="road road-right" id={1}/>
                    <Road className="road road-bottom-right" id={2}/>
                    <Road className="road road-bottom-left" id={3}/>
                    <Road className="road road-left" id={4}/>
                    <Road className="road road-top-left" id={5}/>

                  

                    <Settlement className= "crossroad crossroad-top" id= {0}/>
                    <Settlement className= "crossroad crossroad-top-right" id={1} />
                    <Settlement className= "crossroad crossroad-bottom-right" id={2} />
                    <Settlement className= "crossroad crossroad-bottom" id={3}/>
                    <Settlement className= "crossroad crossroad-bottom-left" id={4} />
                    <Settlement className= "crossroad crossroad-top-left" id={5}/>


                    

                    <div className="dice-index">{this.props.id}</div>

                </div>



        </div>)
    }
}
export default Field;