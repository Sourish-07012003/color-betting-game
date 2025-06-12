import React from 'react';

function HowToPlay() {
  return (
    <div className="how-to-play">
      <h2>How to Play</h2>
      <ul>
        <li>Pick a color: Red, Blue, or Green.</li>
        <li>Select your stake amount (0.1 to 5 coins).</li>
        <li>Each round lasts 2 minutes. Place your bet before time runs out.</li>
        <li>When the round ends, one color is randomly chosen as the winner.</li>
        <li>If your color wins, you receive double your stake!</li>
        <li>Use the History tab to view past results.</li>
        <li>Note: This is a simulated game. Play responsibly.</li>
      </ul>
    </div>
  );
}

export default HowToPlay;