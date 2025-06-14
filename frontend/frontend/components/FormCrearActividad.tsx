"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function FormCrearActividad() {
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    tipo_actividad: "reforestacion",
    ubicacion: "",
    latitud: "",
    longitud: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setFormData({
        ...formData,
        latitud: e.latLng.lat().toString(),
        longitud: e.latLng.lng().toString(),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/actividades/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        setMensaje(`Error: ${error.detail || "No autorizado o datos inválidos."}`);
        return;
      }

      setMensaje("✅ Actividad creada correctamente.");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error("Error al enviar:", error);
      setMensaje("Error inesperado.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <input
        name="titulo"
        placeholder="Título"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input name="fecha" type="date" className="p-2 border rounded" onChange={handleChange} required />
        <input name="hora" type="time" className="p-2 border rounded" onChange={handleChange} required />
      </div>

      <select name="tipo_actividad" className="w-full p-2 border rounded" onChange={handleChange}>
        <option value="reforestacion">Reforestación</option>
        <option value="limpieza">Limpieza</option>
        <option value="educacion">Educación</option>
        <option value="agricultura">Agricultura</option>
      </select>

      <input
        name="ubicacion"
        placeholder="Ubicación"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        required
      />

      {/* Mapa interactivo para seleccionar coordenadas */}
    <div className="h-72 rounded overflow-hidden">
    {isLoaded && (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: -33.45, lng: -70.66 }}
            zoom={11}
            onClick={handleMapClick as any}
        >
            {formData.latitud && formData.longitud && (
                <Marker
                    position={{
                        lat: parseFloat(formData.latitud),
                        lng: parseFloat(formData.longitud),
                    }}
                />
            )}
        </GoogleMap>
    )}
      </div>

      <p className="text-sm text-gray-600">
        Latitud: {formData.latitud || "--"}, Longitud: {formData.longitud || "--"}
      </p>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Crear Actividad
      </button>

      {mensaje && <p className="text-sm text-center mt-2">{mensaje}</p>}
    </form>
  );
}
