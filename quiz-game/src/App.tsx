import React from 'react';
import Quiz from './components/Quiz';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Il Mio Quiz Game</h1>
      </header>
      <main>
        <Quiz />
      </main>
      <footer>
        <p>Fatto con React e TypeScript</p>
      </footer>
    </div>
  );
}

export default App;