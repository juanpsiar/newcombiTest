import React from 'react';
import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <React.Fragment>
      <Header>Header</Header>
      <Home></Home>

      <Footer className=' bottom-0' />
    </React.Fragment>
  );
}

export default App;
