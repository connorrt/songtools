import React from 'react';
import logo from './logo.svg';
import './App.css';
import RandomSongComplex from "./RandomSongComplex";
import RandomSong from "./RandomSong";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RandomSong />
      </header>
    </div>
  );
}

export default App;
