import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import UserProfileProvider from "./context/UserProfile";
import './App.css';

import Footer from './layout/Footer';
import Header from './layout/Header';

import Landing from './screens/Landing';
import Register from "./screens/Register";
import Explore from "./screens/Explore";
import Profile from "./screens/Profile";

function App() {
  return (
    <UserProfileProvider>
      <div className="App">
        <Router>
          <Header />
          <header className="App-container">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" exact element={<Register />} />
              <Route path="/explore" exact element={<Explore />} />
              <Route path="/profile" exact element={<Profile />} />
            </Routes>
          </header>
          <Footer />
        </Router>
      </div >
    </UserProfileProvider>
  );
}

export default App;
