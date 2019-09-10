from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.generics import ListAPIView
from api.serializers import DemandeSerializer, ValidationDemandeSerializer
from api.models import *
from rest_framework.response import Response
from .constants import STATUS
from rest_framework import viewsets
from django.contrib.auth.models import User

class DemandeViewSet(viewsets.ModelViewSet):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

    # Petite modification pour affecter la valeur du demandeur, 
    # du validateur de la mise à jour du status

    def perform_create(self, serializer):
        demande = serializer.validated_data
        user = serializer.context['request'].user
        demande['demandeur'] = user
        demande['validateur_hierarchique'] = user.profil.superieur
        demande['status_demande'] = STATUS[2][1]
        return super().perform_create(serializer)

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


class DemandeCollaborateursView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        demandes = Demande.objects.filter(validateur_hierarchique__profil__superieur__username=username)
        return demandes