import rest_framework
from rest_framework import serializers, exceptions
from .models import *
from django.contrib.auth.models import User
from .constants import *


class DemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = '__all__'
        read_only_fields = (
            'demandeur',
            'status_demande',
            'validation_hierarchique',
            'validateur_hierarchique',
            'validation_securite',
            'validateur_securite',
            'validation_admin'
        )


class DemandesHierarchieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                  'beneficiaire', 'demandeur', 'protocoles', 'status_demande')


class DemandesSecuriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                  'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'validation_hierarchique', 'validateur_hierarchique')

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

        def validate(self, data):
            username = data.get("username", None)
            password = data.get("password", None)

            if username and password:
                # user = autenticate(username=username, password=password)
                # SEND AUTHENTIFICATION REQUEST TO ACTIVE DIRECTORY
                if user:
                    data["user"] = user
                else:
                    raise exceptions.ValidationError(
                        "Cet utilisateur n'existe pas.")

            else:
                raise exceptions.ValidationError(
                    "Veuillez rensiegner le nom d'utilisateur et le mot de passe")

            return data


class ProfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profil
        fields = ('id', 'departement',)


class UserSerializer(serializers.ModelSerializer):
    profil = serializers.Hyperlink(
        url='127.0.0.1:8000/api/demandes/', obj=Profil)

    class Meta:
        model = User
        fields = ('username', 'email', 'profil')


class ProtocoleSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Protocole
        fields = ('nom',)
