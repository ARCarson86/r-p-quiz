import React from 'react';
import './App.css';
import DataTable from './components/DataTable';

function App() {
  return (
    <div className="container App">
      <div className="row">
        <div className="col-12">
          <h1>SpaceX Launches</h1>
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default App;
