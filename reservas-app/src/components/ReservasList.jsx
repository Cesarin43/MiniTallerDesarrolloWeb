// src/components/ReservasList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const ReservasList = ({ reservas, setReservas }) => {
  const [editingReserva, setEditingReserva] = useState(null);
  const [updatedData, setUpdatedData] = useState({ nombre: '', numeroPersonas: '', fecha: '', hora: '', estado: '' });

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

  const handleEditClick = (reserva) => {
    setEditingReserva(reserva.id);
    setUpdatedData({ ...reserva });
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, 'reservas', id), updatedData);
    toast.success('Reserva actualizada con éxito');
    setEditingReserva(null);
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
            {editingReserva === reserva.id ? (
              <div>
                <input
                  type="text"
                  value={updatedData.nombre}
                  onChange={(e) => setUpdatedData({ ...updatedData, nombre: e.target.value })}
                />
                <input
                  type="number"
                  value={updatedData.numeroPersonas}
                  onChange={(e) => setUpdatedData({ ...updatedData, numeroPersonas: e.target.value })}
                />
                <input
                  type="date"
                  value={updatedData.fecha}
                  onChange={(e) => setUpdatedData({ ...updatedData, fecha: e.target.value })}
                />
                <input
                  type="time"
                  value={updatedData.hora}
                  onChange={(e) => setUpdatedData({ ...updatedData, hora: e.target.value })}
                />
                <input
                  type="text"
                  value={updatedData.estado}
                  onChange={(e) => setUpdatedData({ ...updatedData, estado: e.target.value })}
                />
                <button onClick={() => handleUpdate(reserva.id)}>Guardar</button>
                <button onClick={() => setEditingReserva(null)}>Cancelar</button>
              </div>
            ) : (
              <div  class="boton-container">
                {reserva.nombre} - {reserva.numeroPersonas} personas - {reserva.fecha} {reserva.hora} - {reserva.estado}
                <button onClick={() => handleEditClick(reserva)}>Editar</button>
                <button onClick={() => handleDelete(reserva.id)}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservasList;
