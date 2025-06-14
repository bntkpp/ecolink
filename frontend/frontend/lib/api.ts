const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface Activity {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  ubicacion: string;
  latitud: number;
  longitud: number;
  tipo_actividad: "reforestacion" | "limpieza" | "educacion" | "agricultura";
  inscritos: any[]; // puedes tipar con Usuario[] si lo necesitas
  creada_por: string;
}

export interface ImpactData {
  arboles_plantados: number;
  residuos_recolectados_kg: number;
  voluntarios: number;
  beneficiarios: number;
}

export interface Leader {
  id: number;
  nombre: string;
  tipo: string;
  contacto: string;
  actividades: number[];
}

export interface EducationalMaterial {
  id: number;
  titulo: string;
  descripcion: string;
  archivo?: string;
  enlace?: string;
  fecha_publicacion: string;
  categoria_material: "articulo" | "video" | "infografia" | "otro";
}

export const apiService = {
  getAllActivities: async (): Promise<Activity[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/actividades/`);
      if (!response.ok) throw new Error("Error fetching activities");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  },

  // Opcional si creas la vista en Django
  getTodayActivities: async (): Promise<Activity[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/actividades/hoy/`);
      if (!response.ok) throw new Error("Error fetching today's activities");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  },

  getImpactData: async (): Promise<ImpactData> => {
    try {
      const response = await fetch(`${API_BASE_URL}/impactos/`);
      if (!response.ok) throw new Error("Error fetching impact data");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return {
        arboles_plantados: 0,
        residuos_recolectados_kg: 0,
        voluntarios: 0,
        beneficiarios: 0,
      };
    }
  },

  getLeaders: async (): Promise<Leader[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/lideres/`);
      if (!response.ok) throw new Error("Error fetching leaders");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  },

  getEducationalMaterials: async (): Promise<EducationalMaterial[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/recursos/`);
      if (!response.ok) throw new Error("Error fetching materials");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  },

  // Requiere que implementes el endpoint en Django: actividades/<id>/unirse/
  joinActivity: async (activityId: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/actividades/${activityId}/unirse/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Error joining activity:", error);
      return false;
    }
  },
};
