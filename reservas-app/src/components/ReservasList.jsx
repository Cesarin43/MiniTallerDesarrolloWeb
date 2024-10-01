// src/components/ReservasList.js
import React, { useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const ReservasList = ({ reservas, setReservas }) => {
  const fetchReservas = async () => {
    const reservasCollection = collection(db, 'reservas');
    const reservasSnapshot = await getDocs(reservasCollection);
    const reservasList = reservasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setReservas(reservasList);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'reservas', id));
    toast.success('Reserva eliminada con éxito');
    fetchReservas();
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div>
      <h2>Reservas</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.nombre} - {reserva.numeroPersonas} personas - {reserva.fecha} {reserva.hora} - {reserva.estado}
            <button onClick={() => handleDelete(reserva.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservasList;
