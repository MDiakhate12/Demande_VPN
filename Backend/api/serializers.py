import rest_framework
from rest_framework import serializers, exceptions
from .models import *

from .constants import *


class ProtocoleSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = Protocole
        fields = ('nom',)


class DemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = '__all__'
        read_only_fields = (
            'demandeur',
            'status_demande',
            'validation_securite',
            'validation_hierarchique',
            'validateur_securite',
            'validateur_hierarchique',
            'validation_admin'
        )


class ValidationDemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = '__all__'
        read_only_fields = (
            'objet',
            'description',
            'demandeur',
            'status_demande',
            'validation_securite',
            'validation_hierarchique',
            'validateur_securite',
            'validateur_hierarchique',
            'validation_admin'
        )


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        models = User
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
                raise exceptions.ValidationError("Veuillez rensiegner le nom d'utilisateur et le mot de passe")
            
            return data
