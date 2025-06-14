"use client";
import { useEffect, useState } from "react";
import { apiService, type Leader } from "@/lib/api";
import { Star } from "lucide-react";

export default function LideresColaborativos() {
  const [lideres, setLideres] = useState<Leader[]>([]);

  useEffect(() => {
    apiService.getLeaders().then(setLideres);
  }, []);

  return (
    <div className="bg-green-50 p-4 rounded shadow space-y-3">
      <h2 className="text-lg font-semibold text-green-800">👥 Líderes Colaborativos</h2>
      <ul className="space-y-3">
        {lideres.map((lider) => (
          <li key={lider.id} className="flex items-center justify-between bg-white px-3 py-2 rounded border">
            <div>
              <p className="font-semibold">{lider.nombre}</p>
              <p className="text-sm text-gray-600">{lider.tipo}</p>
            </div>
            <div className="flex items-center gap-2 text-yellow-500">
              <Star className="w-4 h-4" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
