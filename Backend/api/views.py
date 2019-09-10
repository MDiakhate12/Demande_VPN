from django.shortcuts import render
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from api.serializers import DemandeSerializer, ValidationDemandeSerializer
from api.models import Demande
from rest_framework.response import Response
from .constants import STATUS
from rest_framework import viewsets
from django.shortcuts import redirect

class DemandeViewSet(viewsets.ModelViewSet):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

class ValidationDemandeRetrieveUpdateView(RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = ValidationDemandeSerializer
    lookup_field = 'id'

    def put(self, request, id, *args, **kwargs):
        demande = Demande.objects.get(pk=id)

        if(demande.validation_hierarchique == False):
            demande.validation_hierarchique = True
        else:
            demande.validation_securite = True

        demande.save()
        return super().put(request, *args, **kwargs)

def rejeter(request, id):
    demande = Demande.objects.get(pk=id)
    demande.status_demande = STATUS[1][1]
    demande.save()

    return redirect('/')

def valider(request, id):
    demande = Demande.objects.get(pk=id)
    if(demande.validation_hierarchique == False):
        demande.validation_hierarchique = True
    else:
        demande.validation_securite = True

    demande.save()

    return redirect('/')
