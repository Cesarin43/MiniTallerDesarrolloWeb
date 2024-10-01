// src/App.js
import React, { useState } from 'react';
import ReservaForm from './components/ReservaForm';
import ReservasList from './components/ReservasList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [reservas, setReservas] = useState([]);

  return (
    <div className="container mt-5">
      <h1>Gestión de Reservas</h1>
      <ReservaForm fetchReservas={() => setReservas(reservas)} />
      <ReservasList reservas={reservas} setReservas={setReservas} />
      <ToastContainer />
    </div>
  );
};

export default App;
