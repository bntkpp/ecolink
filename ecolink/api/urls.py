from rest_framework import routers
from .views import (
    UsuarioViewSet, ActividadViewSet, EvidenciaViewSet,
    ImpactoViewSet, RecursoEducativoViewSet, LiderColaborativoViewSet
)
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'actividades', ActividadViewSet)
router.register(r'evidencias', EvidenciaViewSet)
router.register(r'impactos', ImpactoViewSet)
router.register(r'recursos', RecursoEducativoViewSet)
router.register(r'lideres', LiderColaborativoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]