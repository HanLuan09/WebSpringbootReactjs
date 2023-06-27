import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListComponent from '~/components/ListComponent';
import AddComponent from '~/components/AddComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<ListComponent />} />
            <Route path="/home" element={<ListComponent />} />
            <Route path="/add" element={<AddComponent />} />
            <Route path="/edit/:id" element={<AddComponent />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
