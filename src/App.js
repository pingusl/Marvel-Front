//----Loading Tools----//
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Cookies from "js-cookie";

import logo from "./img/logo.png";

//----Load Pages----//
import Characters from "./pages/characters";
import Character from "./pages/character";
import Comics from "./pages/comics";
import Comic from "./pages/comic";
import "./components/reset.css";
import "./App.scss";

//----Setting Cookies----//
Cookies.set("favorisCharacters", "");

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <Link className="header-characters" to="/characters">
            <h1 className="header-characters">Characters</h1>
          </Link>
          <img src={logo} className="App-logo" alt="logo" />
          <Link className="header-comics" to="/comics">
            <h1 className="header-comics">Comics</h1>
          </Link>
        </header>
        <div className="main-container">
          <div className="main">
            <Routes>
              <Route path="/" element={<Characters />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/character/:id" element={<Character />} />
              <Route path="/comics" element={<Comics />} />
              <Route path="/comic/:id" element={<Comic />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
