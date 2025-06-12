import React, { useState, useEffect, useRef, useContext } from 'react';
import './GamePage.css';
import { GameContext } from '../context/GameContext';


const COLORS = ['Red', 'Green', 'Blue'];
const STAKES = [0.1, 0.2, 0.5, 1, 2, 5];

export default function GamePage() {
  const [onlineUsers] = useState(100 + Math.floor(Math.random() * 50));
  const [roundNum, setRoundNum] = useState(1);
  const [timer, setTimer] = useState(120);
  const [bets, setBets] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStake, setSelectedStake] = useState(STAKES[0]);

  const { history, setHistory, colorWins, setColorWins } = useContext(GameContext);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          resolveRound();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [bets, roundNum]);

  const resolveRound = () => {
    const winner = COLORS[Math.floor(Math.random() * COLORS.length)];
    setColorWins(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
    setRoundNum(prev => prev + 1);

    const totalStake = bets.reduce((a, b) => a + b.stake, 0);
    const winners = bets.filter(b => b.color === winner);
    const netChange = winners.length
      ? winners[0].stake * 2
      : -bets[0]?.stake || 0;

    setHistory(prev => [{
      round: roundNum,
      winner,
      totalStake,
      userResult: winners.length > 0 ? 'Win' : 'Loss',
      coins: netChange
    }, ...prev]);

    setBets([]);
  };

  const placeBet = () => {
    if (!selectedColor) return alert('Please choose a colour!');
    setBets([{ color: selectedColor, stake: selectedStake }]);
  };

  const totalRounds = Object.values(colorWins).reduce((a, b) => a + b, 0);

  return (
    <div className="game-page">
      <header className="header">🎨 <span>Color Betting Game</span></header>

      <div className="status-bar">
        <span>👥 Online: {onlineUsers}</span>
        <span>🔄 Round: {roundNum}</span>
        <span>⏱️ Time: {timer}s</span>
      </div>

      <div className="colors-grid">
        {COLORS.map(c => (
          <div key={c} className={`color-card ${c.toLowerCase()}`}>
            <h3>{c}</h3>
            <p>Win %: {totalRounds ? ((colorWins[c] / totalRounds) * 100).toFixed(1) : '–'}%</p>
            <p>Wins: {colorWins[c]}</p>
          </div>
        ))}
      </div>

      <div className="bet-controls">
        <select onChange={e => setSelectedColor(e.target.value)} value={selectedColor}>
          <option value="">🎯 Choose Colour</option>
          {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select onChange={e => setSelectedStake(parseFloat(e.target.value))} value={selectedStake}>
          {STAKES.map(s => (
            <option key={s} value={s}>{s} coin</option>
          ))}
        </select>

        <button onClick={placeBet}>💰 Place Bet</button>
      </div>
    </div>
  );
}
