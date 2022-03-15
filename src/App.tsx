import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import DebugTools from './components/DebugTools';
import {RecoilRoot} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div className="container p-2">
        <Navbar />
        <DebugTools />
      </div>
    </RecoilRoot>
  );
}

export default App;
