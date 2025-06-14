from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Usuario, Actividad, Evidencia, Impacto, RecursoEducativo, LiderColaborativo
from .serializers import (
    UsuarioSerializer, ActividadSerializer, EvidenciaSerializer,
    ImpactoSerializer, RecursoEducativoSerializer, LiderColaborativoSerializer
)
from datetime import date
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer

    def get_permissions(self):
        if self.action in ["create"]:
            return [IsAuthenticated()]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        if not hasattr(request.user, "es_lider") or not request.user.es_lider:
            return Response(
                {"error": "Solo los líderes colaborativos pueden crear actividades."},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=["get"], url_path="hoy")
    def actividades_hoy(self, request):
        hoy = date.today()
        actividades = self.queryset.filter(fecha=hoy)
        serializer = self.get_serializer(actividades, many=True)
        return Response(serializer.data)
    

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
