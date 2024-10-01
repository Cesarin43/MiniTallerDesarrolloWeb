// src/components/ReservaForm.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const ReservaForm = ({ fetchReservas }) => {
  const [nombre, setNombre] = useState('');
  const [numeroPersonas, setNumeroPersonas] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [estado, setEstado] = useState('Confirmada');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !numeroPersonas || !fecha || !hora) {
      toast.error('Por favor, completa todos los campos');
      return;
    }
    
    try {
      await addDoc(collection(db, 'reservas'), {
        nombre,
        numeroPersonas,
        fecha,
        hora,
        estado
      });
      toast.success('Reserva creada con éxito');
      fetchReservas();
      setNombre('');
      setNumeroPersonas('');
      setFecha('');
      setHora('');
    } catch (error) {
      toast.error('Error al crear la reserva');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
      <input type="number" value={numeroPersonas} onChange={(e) => setNumeroPersonas(e.target.value)} placeholder="Número de personas" required />
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="Confirmada">Confirmada</option>
        <option value="Cancelada">Cancelada</option>
      </select>
      <button type="submit">Crear Reserva</button>
    </form>
  );
};

export default ReservaForm;
