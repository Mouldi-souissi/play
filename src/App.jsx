import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import MainPages from "./pages/MainPages";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={MainPages} />
          <PublicRoute exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
