from django.db import models
from django.contrib.auth.models import User
from .constants import DEPARTEMENTS, STATUS

class Profil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profil')
    superieur = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='agents')
    departement = models.CharField(max_length=100, choices=DEPARTEMENTS)

class Demande(models.Model):

    objet = models.CharField(max_length=100)
    description = models.TextField()
    demandeur = models.OneToOneField(User, on_delete=models.SET_NULL, related_name='demandes', null=True, blank=True)
    validateur_securite = models.OneToOneField(User, on_delete=models.SET_NULL, related_name='demandes_recues', null=True, blank=True)
    validateur_hierarchique = models.OneToOneField(User, on_delete=models.SET_NULL, related_name='demandes_agents', null=True, blank=True)
    status_demande = models.CharField(max_length=100, choices=STATUS, null=True, blank=True)
    validation_securite = models.BooleanField(default=False)
    validation_hierarchique = models.BooleanField(default=False)
    validation_admin = models.BooleanField(default=False)
    date = models.DateTimeField()
    date_expiration = models.DateTimeField(null=True, blank=True)


class Admin(models.Model):
    pass