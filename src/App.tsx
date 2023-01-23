import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path={"/tv"} element={<Tv />}></Route>
        <Route path={"/tv/:tvId"} element={<Tv />}></Route>
        <Route path={"/search"} element={<Search />}></Route>
        <Route path={"/search/tv/:id"} element={<Search />}></Route>
        <Route path={"/search/movie/:id"} element={<Search />}></Route>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/movies/:movieId"} element={<Home />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
