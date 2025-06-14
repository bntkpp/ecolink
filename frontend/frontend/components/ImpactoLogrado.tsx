"use client";
import { useEffect, useState } from "react";
import { apiService, type ImpactData } from "@/lib/api";
import { Leaf, Recycle, Droplet, Sun } from "lucide-react";

export default function ImpactoLogrado() {
  const [impacto, setImpacto] = useState<ImpactData | null>(null);

  useEffect(() => {
    apiService.getImpactData().then(setImpacto);
  }, []);

  return (
    <div className="bg-green-50 p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold text-green-800">🌿 Impacto Logrado</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center text-white">
        <ImpactCard icon={<Leaf />} label="Árboles Plantados" value={impacto?.arboles_plantados ?? 0} color="bg-green-500" />
        <ImpactCard icon={<Droplet />} label="Litros de Agua Limpiados" value={impacto?.beneficiarios ?? 0} color="bg-blue-500" />
        <ImpactCard icon={<Recycle />} label="Kg de Residuos Reciclados" value={impacto?.residuos_recolectados_kg ?? 0} color="bg-yellow-500" />
        <ImpactCard icon={<Sun />} label="Voluntarios" value={impacto?.voluntarios ?? 0} color="bg-rose-500" />
      </div>
    </div>
  );
}

function ImpactCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number | string; color: string }) {
  return (
    <div className={`rounded-lg p-4 ${color} shadow-md`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-bold">{value.toLocaleString()}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}