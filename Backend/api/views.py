from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.generics import ListAPIView
from api.serializers import *   
from api.models import *
from rest_framework.response import Response
from .constants import STATUS
from rest_framework import viewsets, generics
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
        demande['status_demande'] = STATUS[2][0]
        return super().perform_create(serializer)



    
class RefustHierarchie(generics.RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

    def perform_update(self, serializer):
        demande = serializer.validated_data
        demande.validation_hierarchique = False
        return super().perform_update(serializer)

class RefusSecurite(generics.RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

    def perform_update(self, serializer):
        demande = serializer.validated_data
        if(demande.validation_hierarchique == True):
            demande.validation_hierarchique = False
        return super().perform_update(serializer)

class Validation_hierarchique(generics.RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

    def perform_update(self, serializer):
        demande = serializer.validated_data
        if(demande.validation_hierarchique == False and demande.get_status() == STATUS.attente_hierarchie):
            demande.validation_hierarchique = True
        return super().perform_update(serializer)

class Validation_securite(generics.RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

    def perform_update(self, serializer):
        demande = serializer.validated_data
        if(demande.validation_hierarchique==True and demande.get_status() == STATUS.attente_securite):
            demande.validation_securite = True
            demande.set_status[STATUS.attente_admin]
        return super().perform_update(serializer)


class ValidationAdmin(generics.RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

    def perform_update(self, serializer):
        demande = serializer.validated_data
        if(demande.validation_securite == True and demande.get_status() == STATUS.attente_admin):
            demande.set_status[STATUS.valide]
        return super().perform_update(serializer)

class Expiration(generics.RetrieveUpdateAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

    def perform_update(self, serializer):
        demande = serializer.validated_data
        demande.set_status[STATUS.expire]
        return super().perform_update(serializer)



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class DemandesCollaborateursView(ListAPIView):
    serializer_class = DemandesHierarchieSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        demandes = Demande.objects.filter(validateur_hierarchique__profil__superieur__username=username)
        return demandes

class DemandesSecuriteEnAttenteView(ListAPIView):
    serializer_class = DemandesSecuriteSerializer
    

    def get_queryset(self):
        demandes = Demande.objects.filter(status_demande=STATUS[2][0], validation_hierarchique=True)
        print(demandes)
        print(STATUS[2][1])
        return demandes