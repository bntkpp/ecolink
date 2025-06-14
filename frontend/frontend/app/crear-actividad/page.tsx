import FormCrearActividad from "@/components/FormCrearActividad";

export default function CrearActividadPage() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Actividad</h1>
      <FormCrearActividad />
    </main>
  );
}