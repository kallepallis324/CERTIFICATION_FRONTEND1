import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopBar from "./Components/TopBar/TopBar";
import { useState } from "react";
import TeamDetails from "./Components/TeamDetails/TeamDetails";
import PlayerDetails from "./Components/PlayerDetails/PlayerDetails";

function App() {
  const [isOpen, setisOpen] = useState(false);
  const shareDataToComponents = (isOpen) => {
    setisOpen(isOpen);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar shareDataToComponents={shareDataToComponents} isOpen={isOpen} />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <HomePage
                isOpen={isOpen}
                shareDataToComponents={shareDataToComponents}
              />
            )}
          />
          <Route path="/team/:team/:id" component={TeamDetails} />
          <Route path="/player/:id" component={PlayerDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
