"use client";
import { useEffect, useState } from "react";

type Actividad = {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  ubicacion: string;
};

export default function Actividades() {
  const [actividades, setActividades] = useState<Actividad[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/actividades/")
      .then((res) => res.json())
      .then((data) => {
        // Si la respuesta tiene 'results', úsala; si no, usa data directamente
        setActividades(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => console.error("Error al cargar actividades:", err));
  }, []);

  return (
    <div className="p-4 min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-xl font-bold mb-4">Actividades disponibles</h1>
      <ul className="space-y-4">
        {actividades.map((act) => (
          <li key={act.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{act.titulo}</h2>
            <p>{act.descripcion}</p>
            <p><strong>Ubicación:</strong> {act.ubicacion}</p>
            <p><strong>Fecha:</strong> {act.fecha} - <strong>Hora:</strong> {act.hora}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}