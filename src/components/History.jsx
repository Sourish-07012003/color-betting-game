import React, { useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';


export default function History() {
  const [tab, setTab] = useState('game');
  const { history } = useContext(GameContext);

  return (
    <div className="history-page">
      <h2>📜 {tab === 'game' ? 'Game History' : 'My History'}</h2>

      <div className="tabs">
        <button onClick={() => setTab('game')} className={tab === 'game' ? 'active' : ''}>Game History</button>
        <button onClick={() => setTab('my')} className={tab === 'my' ? 'active' : ''}>My History</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Winner</th>
            <th>Total Stake</th>
            {tab === 'my' && (
              <>
                <th>Result</th>
                <th>Coins</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {history.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.round}</td>
              <td>{entry.winner}</td>
              <td>{entry.totalStake.toFixed(2)} coins</td>
              {tab === 'my' && (
                <>
                  <td className={entry.userResult === 'Win' ? 'win' : 'loss'}>
                    {entry.userResult}
                  </td>
                  <td>{entry.coins > 0 ? '+' : ''}{entry.coins} coins</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
