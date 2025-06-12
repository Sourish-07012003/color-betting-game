import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GamePage from './components/GamePage';
import HowToPlay from './components/HowToPlay';
import History from './components/History';
import './App.css';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="app">
          <header className="header">
            <h1>🎯 Color Betting Game</h1>
            <nav>
              <Link to="/">Game</Link>
              <Link to="/how-to-play">How to Play</Link>
              <Link to="/history">History</Link>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;