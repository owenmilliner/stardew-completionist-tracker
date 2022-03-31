import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Instructions from './components/Instructions';
import { FileProvider } from './contexts/FileContext';

function App() {
  return (
    <BrowserRouter>
      <FileProvider>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Instructions />}></Route>
          </Routes>
        </div>
      </FileProvider>
    </BrowserRouter>
  );
}

export default App;
