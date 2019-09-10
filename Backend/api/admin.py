from django.contrib import admin
from .models import Demande, Profil, Protocole, Application

admin.site.register(Demande)
admin.site.register(Profil)
admin.site.register(Protocole)
admin.site.register(Application)