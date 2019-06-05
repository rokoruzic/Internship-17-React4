import React from "react";
import Field from "./Field"
import "./Board.css";
class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className= "wrapper">
         <div className="field-row">
               <Field id = {0}/>
               <Field id = {1}/>
               <Field id = {2}/>
         

            </div>
            <div className="field-row">
            <Field id = {3}/>
               <Field id = {4}/>
               <Field id = {5}/>
               <Field id = {6}/>

         

            </div> <div className="field-row">
            <Field id = {7}/>
               <Field id = {8}/>
               <Field id = {9}/>
               <Field id = {10}/>
               <Field id = {11}/>

         

            </div> <div className="field-row">
            <Field id = {12}/>
               <Field id = {13}/>
               <Field id = {14}/>
               <Field id = {15}/>

         

            </div> <div className="field-row">
            <Field id = {16}/>
               <Field id = {17}/>
               <Field id = {18}/>
         

            </div>

      </div>
    );
  }
}
export default Board;
