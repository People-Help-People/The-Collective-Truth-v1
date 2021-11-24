import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';

import Footer from './layout/Footer';
import Header from './layout/Header';

import Landing from './screens/Landing';
import Register from "./screens/Register";
import Explore from "./screens/Explore";

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-container">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/explore" exact element={<Explore />} />
          </Routes>
        </Router>
      </header>
      <Footer />
    </div >
  );
}

export default App;
