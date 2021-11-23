import './App.css';
import Landing from './components/Landing';
import Footer from './layout/Footer';
import Header from './layout/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-container">
        <Landing />
      </header>
      <Footer />
    </div>
  );
}

export default App;
