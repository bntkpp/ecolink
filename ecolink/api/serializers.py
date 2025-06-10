from rest_framework import serializers
from .models import Usuario, Actividad, Evidencia, Impacto, RecursoEducativo, LiderColaborativo

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'password', 'last_login', 'is_superuser', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined', 'es_lider_colaborativo']
        read_only_fields = ['id', 'is_active', 'is_staff']

class ActividadSerializer(serializers.ModelSerializer):
    inscritos = UsuarioSerializer(many=True, read_only=True)

    class Meta:
        model = Actividad
        fields = ['id', 'titulo', 'descripcion', 'fecha', 'hora', 'ubicacion', 'latitud', 'longitud', 'inscritos', 'creada_por']
        read_only_fields = ['id', 'inscritos']

class EvidenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evidencia
        fields = ['id', 'actividad', 'imagen', 'descripcion', 'fecha_subida']
        read_only_fields = ['id', 'fecha_subida']

class ImpactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Impacto
        fields = ['id', 'actividad', 'voluntarios', 'residuos_recolectados_kg', 'arboles_plantados', 'beneficiarios']
        read_only_fields = ['id']

class RecursoEducativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecursoEducativo
        fields = ['id', 'titulo', 'descripcion', 'archivo', 'enlace', 'fecha_publicacion']
        read_only_fields = ['id', 'fecha_publicacion']

class LiderColaborativoSerializer(serializers.ModelSerializer):
    actividades = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Actividad.objects.all()
    )

    class Meta:
        model = LiderColaborativo
        fields = ['id', 'nombre', 'tipo', 'contacto', 'actividades']
        read_only_fields = ['id']