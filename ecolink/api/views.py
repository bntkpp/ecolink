from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario, Actividad, Evidencia, Impacto, RecursoEducativo, LiderColaborativo
from .serializers import (
    UsuarioSerializer, ActividadSerializer, EvidenciaSerializer,
    ImpactoSerializer, RecursoEducativoSerializer, LiderColaborativoSerializer
)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer

class EvidenciaViewSet(viewsets.ModelViewSet):
    queryset = Evidencia.objects.all()
    serializer_class = EvidenciaSerializer

class ImpactoViewSet(viewsets.ModelViewSet):
    queryset = Impacto.objects.all()
    serializer_class = ImpactoSerializer

class RecursoEducativoViewSet(viewsets.ModelViewSet):
    queryset = RecursoEducativo.objects.all()
    serializer_class = RecursoEducativoSerializer

class LiderColaborativoViewSet(viewsets.ModelViewSet):
    queryset = LiderColaborativo.objects.all()
    serializer_class = LiderColaborativoSerializer
