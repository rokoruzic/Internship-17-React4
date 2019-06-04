import React from "react";
import "./Board.css";
class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
      {/* <div className="field">


        <div className="field-row">
          <div>
            <div className="hex-top" style={{ borderBottomColor: "red" }} />
            <div className="hex-middle" style={{ backgroundColor: "red" }}  />
            <div className="hex-bottom" style={{ borderTopColor: "red" }}  />
          </div>

          <div>
            <div className="hex-top" style={{ borderBottomColor: "pink" }} />
            <div className="hex-middle" style={{ backgroundColor: "pink" }} />
            <div className="hex-bottom" style={{ borderTopColor: "pink" }} />
          </div>
          <div>
            <div className="hex-top" style={{ borderBottomColor: "purple" }} />
            <div className="hex-middle" style={{ backgroundColor: "purple" }} />
            <div className="hex-bottom" style={{ borderTopColor: "purple" }} />
          </div>
        </div>


        <div className="field-row">
          <div>
            <div className="hex-top" style={{ borderBottomColor: "red" }} />
            <div className="hex-middle" style={{ backgroundColor: "red" }} />
            <div className="hex-bottom" style={{ borderTopColor: "red" }} />
          </div>

          <div>
            <div className="hex-top" style={{ borderBottomColor: "pink" }} />
            <div className="hex-middle" style={{ backgroundColor: "pink" }} />
            <div className="hex-bottom" style={{ borderTopColor: "pink" }} />
          </div>
          <div>
            <div className="hex-top" style={{ borderBottomColor: "purple" }} />
            <div className="hex-middle" style={{ backgroundColor: "purple" }} />
            <div className="hex-bottom" style={{ borderTopColor: "purple" }} />
          </div>
          <div>
            <div className="hex-top" style={{ borderBottomColor: "yellow" }} />
            <div className="hex-middle" style={{ backgroundColor: "yellow" }} />
            <div className="hex-bottom" style={{ borderTopColor: "yellow" }} />
          </div>
        </div>

        <div className="field-row">
          <div>
            <div className="hex-top" style={{ borderBottomColor: "red" }} />
            <div className="hex-middle" style={{ backgroundColor: "red" }} />
            <div className="hex-bottom" style={{ borderTopColor: "red" }} />
          </div>

          <div>
            <div className="hex-top" style={{ borderBottomColor: "pink" }} />
            <div className="hex-middle" style={{ backgroundColor: "pink" }} />
            <div className="hex-bottom" style={{ borderTopColor: "pink" }} />
          </div>
          <div>
            <div className="hex-top" style={{ borderBottomColor: "purple" }} />
            <div className="hex-middle" style={{ backgroundColor: "purple" }} />
            <div className="hex-bottom" style={{ borderTopColor: "purple" }} />
          </div>
          <div>
            <div className="hex-top" style={{ borderBottomColor: "yellow" }} />
            <div className="hex-middle" style={{ backgroundColor: "yellow" }} />
            <div className="hex-bottom" style={{ borderTopColor: "yellow" }} />
          </div>
          <div>
            <div className="hex-top" style={{ borderBottomColor: "blue" }} />
            <div className="hex-middle" style={{ backgroundColor: "blue" }} />
            <div className="hex-bottom" style={{ borderTopColor: "blue" }} />
          </div>
        </div>

        <div className="field-row">
          <div>
            <div className="hex-top" style={{ borderBottomColor: "red" }} />
            <div className="hex-middle" style={{ backgroundColor: "red" }} />
            <div className="hex-bottom" style={{ borderTopColor: "red" }} />
          </div>

          <div>
            <div className="hex-top" style={{ borderBottomColor: "pink" }} />
            <div className="hex-middle" style={{ backgroundColor: "pink" }} />
            <div className="hex-bottom" style={{ borderTopColor: "pink" }} />
          </div>
          <div>
            <div className="hex-top" style={{ borderBottomColor: "purple" }} />
            <div className="hex-middle" style={{ backgroundColor: "purple" }} />
            <div className="hex-bottom" style={{ borderTopColor: "purple" }} />
          </div>
          <div>
            <div className="hex-top" style={{ borderBottomColor: "yellow" }} />
            <div className="hex-middle" style={{ backgroundColor: "yellow" }} />
            <div className="hex-bottom" style={{ borderTopColor: "yellow" }} />
          </div>
        </div>
        
        <div className="field-row">
          <div>
            <div className="hex-top" style={{ borderBottomColor: "red" }} />
            <div className="hex-middle" style={{ backgroundColor: "red" }} />
            <div className="hex-bottom" style={{ borderTopColor: "red" }} />
          </div>

          <div>
            <div className="hex-top" style={{ borderBottomColor: "pink" }} />
            <div className="hex-middle" style={{ backgroundColor: "pink" }} />
            <div className="hex-bottom" style={{ borderTopColor: "pink" }} />
          </div>
          <div>
            <div className="hex-top" style={{ borderBottomColor: "purple" }} />
            <div className="hex-middle" style={{ backgroundColor: "purple" }} />
            <div className="hex-bottom" style={{ borderTopColor: "purple" }} />
          </div>
        </div>

        </div> */}
        <div className="hex-row">
        <div className= "hex.even">
        <div className="hex"></div>
        <div className="hex"></div>
        <div className="hex"></div>
        </div>
        </div>
        <div className="hex"></div>
        <div className="hex"></div>

      </>
    );
  }
}
export default Board;
