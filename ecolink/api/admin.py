from django.contrib import admin
from .models import Usuario, Actividad, Evidencia, Impacto, RecursoEducativo, LiderColaborativo

# Register your models here.

admin.site.register(Usuario)
admin.site.register(Actividad)
admin.site.register(Evidencia)
admin.site.register(Impacto)
admin.site.register(RecursoEducativo)
admin.site.register(LiderColaborativo)