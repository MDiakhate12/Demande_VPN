import rest_framework
from rest_framework import serializers, exceptions
from .models import *
from django.contrib.auth.models import User
from .constants import *

class ProfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profil
        fields = ['entreprise', 'telephone', 'departement', 'superieur']


class UserSerializer(serializers.ModelSerializer):
    profil = ProfilSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profil')


class ProtocoleSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Protocole
        fields = ('nom',)

class ApplicationSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('nom', 'adresse_ip')


class DemandeSerializer(serializers.ModelSerializer):
    demandeur = UserSerializer()
    beneficiaire = UserSerializer()
    validateur_hierarchique = UserSerializer()
    validateur_securite = UserSerializer()
    protocoles = ProtocoleSeriallizer(many=True)
    applications = ApplicationSeriallizer(many=True)

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
                  'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'applications', 'validation_hierarchique', 'validateur_hierarchique')
        read_only_fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                  'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'applications', 'validation_hierarchique', 'validateur_hierarchique')


class DemandesSecuriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande

        fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                  'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'validation_hierarchique', 'validateur_hierarchique', 'validation_securite', 'validateur_securite')

        read_only_fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                  'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'applications', 'validation_hierarchique', 'validateur_hierarchique', 'validation_securite', 'validateur_securite')


class DemandesAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande

        fields = '__all__'

        read_only_fields = ('id', 'objet', 'description', 'date', 'date_expiration',
                  'beneficiaire', 'demandeur', 'protocoles', 'status_demande', 'applications', 'validation_hierarchique', 'validateur_hierarchique', 'validation_securite', 'validateur_securite', 'validation_admin')


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


