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
import Asset from "./screens/Asset";
// import PrivateRoute from "./misc/PrivateRoute";
import AlertProvider from "./context/Alert";

function App() {
  return (
    <UserProfileProvider>
      <AlertProvider>
        <div className="App">
          <Router>
            <Header />
            <header className="App-container">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/explore" exact element={<Explore />} />
                <Route path="/explore/:id" element={<Asset />} />
                <Route path="/profile" exact element={<Profile />} />
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </main>
                  }
                />
              </Routes>
            </header>
            <Footer />
          </Router>
        </div >
      </AlertProvider>
    </UserProfileProvider>
  );
}

export default App;
