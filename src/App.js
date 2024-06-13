import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MedicationSearch from './components/MedicationSearch';
import MedicationDetails from './components/MedicationDetails';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MedicationSearch />} />
        <Route path="/medication/:id" element={<MedicationDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
