import Navbar from "@/components/Navbar";
import MapaActividades from "@/components/MapaActividades";
import ActividadesDelDia from "@/components/ActividadesDelDia";
import Actividades from "@/components/Actividades";
import ImpactoLogrado from "@/components/ImpactoLogrado";
import MaterialEducativo from "@/components/MaterialEducativo";
import LideresColaborativos from "@/components/LideresColaborativos";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-100 min-h-screen p-6 space-y-10">
        {/* Título principal */}
        <h1 className="text-2xl font-bold">Plataforma Eco/Link</h1>

        {/* Fila 1: Mapa + Actividades del Día */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <MapaActividades />
          </div>
          <div>
            <ActividadesDelDia />
          </div>
        </section>

        {/* Fila 3: Impacto + Material educativo + Líderes */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ImpactoLogrado />
          <MaterialEducativo />
          <LideresColaborativos />
        </section>
      </main>

      <Footer />
    </>
  );
}



