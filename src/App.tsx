import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={["/tv", "/tv/:tvId"]}>
          <Tv />
        </Route>
        <Route path={["/search", "/search/movie/:id", "/tv/:id"]}>
          <Search />
        </Route>
        <Route path={["/", "movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
