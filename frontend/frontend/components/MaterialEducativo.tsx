"use client";
import { useEffect, useState } from "react";
import { apiService, type EducationalMaterial } from "@/lib/api";
import { FileText, Video, Image as Img } from "lucide-react";

export default function MaterialEducativo() {
  const [materiales, setMateriales] = useState<EducationalMaterial[]>([]);

  useEffect(() => {
    apiService.getEducationalMaterials().then(setMateriales);
  }, []);

  const iconForType = (type: string) => {
    switch (type) {
      case "pdf": return <FileText />;
      case "video": return <Video />;
      case "image": return <Img />;
      default: return <FileText />;
    }
  };

  return (
    <div className="bg-green-50 p-4 rounded shadow space-y-3">
      <h2 className="text-lg font-semibold text-green-800">📚 Material Educativo</h2>
      <ul className="space-y-2">
        {materiales.map((mat) => (
          <li key={mat.id} className="flex items-center justify-between bg-white px-3 py-2 rounded border">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold">{mat.titulo}</p>
                <p className="text-sm text-gray-600">{mat.categoria_material}</p>
              </div>
            </div>
            <a href={mat.enlace} target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">
              Descargar
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}