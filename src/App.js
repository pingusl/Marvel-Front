//----Loading Tools----//
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import logo from "./img/logo.png";

//----Load Pages----//
import Characters from "./pages/characters";
import Comics from "./pages/comics";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="header-characters">Characters</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="header-comics">Comics</h1>
      </header>
      <div className="main-container">
        <div className="main">
          <Router>
            <Routes>
              <Route path="/characters" element={<Characters />} />
              <Route path="/comics" element={<Comics />} />
            </Routes>
          </Router>
          <Characters />
          <Comics />
        </div>
      </div>
    </div>
  );
}

export default App;
