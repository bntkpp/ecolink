from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


#Definir el modelo de usuario personalizado
class Usuario(AbstractUser):
    es_lider_colaborativo = models.BooleanField(default=False)
    # Puedes agregar más campos personalizados aquí

    def __str__(self):
        return self.username


class Actividad(models.Model):
    TIPO_ACTIVIDAD_CHOICES = [
        ("limpieza", "Limpieza"),
        ("reforestacion", "Reforestación"),
        ("reciclaje", "Reciclaje"),
        ("educacion", "Educación Ambiental"),
        ("otro", "Otro"),
    ]
    tipo_actividad = models.CharField(
        max_length=20,
        choices=TIPO_ACTIVIDAD_CHOICES,
        default="otro"
    )
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha = models.DateField()
    hora = models.TimeField()
    ubicacion = models.CharField(max_length=255)
    latitud = models.FloatField()
    longitud = models.FloatField()
    inscritos = models.ManyToManyField("Usuario", related_name="actividades_inscritas", blank=True)
    creada_por = models.ForeignKey("Usuario", on_delete=models.CASCADE, null=True, related_name="actividades_creadas")
    
    def __str__(self):
        return f"{self.titulo} - {self.fecha} a las {self.hora} en {self.ubicacion}"
    

class Evidencia(models.Model):
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name="evidencias")
    imagen = models.URLField() 
    descripcion = models.TextField(blank=True)
    fecha_subida = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Evidencia de {self.actividad.titulo} ({self.fecha_subida})"


class Impacto(models.Model):
    actividad = models.OneToOneField(Actividad, on_delete=models.CASCADE, related_name="impacto")
    voluntarios = models.PositiveIntegerField(default=0)
    residuos_recolectados_kg = models.FloatField(default=0)
    arboles_plantados = models.PositiveIntegerField(default=0)
    beneficiarios = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Impacto de {self.actividad.titulo}"


class RecursoEducativo(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    archivo = models.FileField(upload_to="recursos_educativos/", blank=True, null=True)
    enlace = models.URLField(blank=True, null=True)
    fecha_publicacion = models.DateField(auto_now_add=True)
    categoria_material = models.CharField(max_length=100, default="otrorecurso", choices=[
        ("articulo", "Artículo"),
        ("video", "Video"),
        ("infografia", "Infografía"),
        ("otro", "Otro"),
    ])

    def __str__(self):
        return self.titulo


class LiderColaborativo(models.Model):
    nombre = models.CharField(max_length=200)
    tipo = models.CharField(max_length=100, choices=[
        ("escuela", "Escuela"),
        ("universidad", "Universidad"),
        ("ong", "ONG"),
        ("empresa", "Empresa"),
        ("otro", "Otro"),
    ])
    contacto = models.CharField(max_length=255, blank=True)
    actividades = models.ManyToManyField(Actividad, related_name="lideres_colaborativos", blank=True)

    def __str__(self):
        return self.nombre