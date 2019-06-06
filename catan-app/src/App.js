import React from "react";
import Board from "./components/Game/Board/Board";
import Game from "./components/Game/Game";

import { Provider } from "react-redux";
import store from "./redux";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   

    return (
      <>
        <Provider store={store}>
          <Game />
        </Provider>
      </>
    );
  }
}

export default App;
