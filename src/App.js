import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Instructions from './components/Instructions';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Instructions />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
