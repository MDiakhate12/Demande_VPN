from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from api.serializers import *   
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
        demande['status_demande'] = STATUS.attente_hierarchie
        return super().perform_create(serializer)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DemandesCollaborateursView(ListAPIView):
    serializer_class = DemandesHierarchieSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        demandes_collaborateurs = Demande.objects.filter(demandeur__profil__superieur__username=username, )
        return demandes_collaborateurs

class DemandesSecuriteEnAttenteView(ListAPIView):
    serializer_class = DemandesSecuriteSerializer
    

    def get_queryset(self):
        demandes = Demande.objects.filter(status_demande=STATUS.attente_securite, validation_hierarchique=True)
        return demandes