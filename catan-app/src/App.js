import React from "react";
import Game from "./components/Game/Game";
import { Provider } from "react-redux";
import store from "./redux";
class App extends React.Component {
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
