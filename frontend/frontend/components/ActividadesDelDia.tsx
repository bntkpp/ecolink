"use client";
import { useEffect, useState } from "react";
import { apiService, type Activity } from "@/lib/api";

export default function ActividadesDelDia() {
  const [actividades, setActividades] = useState<Activity[]>([]);

  useEffect(() => {
    apiService.getTodayActivities().then(setActividades);
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Actividades del Día</h2>

      {actividades.length === 0 ? (
        <p className="text-sm text-gray-600">No hay actividades programadas para hoy.</p>
      ) : (
        <table className="w-full text-sm text-left border">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Hora</th>
              <th className="px-4 py-2">Ubicación</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Inscritos</th>
            </tr>
          </thead>
          <tbody>
            {actividades.map((act) => (
              <tr key={act.id} className="border-t">
                <td className="px-4 py-2">{act.titulo}</td>
                <td className="px-4 py-2">{act.hora}</td>
                <td className="px-4 py-2">{act.ubicacion}</td>
                <td className="px-4 py-2 capitalize">{act.tipo_actividad}</td>
                <td className="px-4 py-2">{act.inscritos?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}