"""Demande_VPN URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('demandes', views.DemandeViewSet)
router.register('users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('demandes/rejeter/<int:id>/', views.rejeter, name='rejeter-demande'),
    path('demandes/valider/<int:id>/', views.valider, name='valider-demande'),
    path('demandes/validateur/<str:username>/',
         views.DemandesCollaborateursView.as_view(), name='validateur-demandes'),
    path('demandes/securite/en-attente/',
         views.DemandesSecuriteEnAttenteView.as_view(), name='validateur-demandes'),

    path('demandes/valider-hierarchie/<int:id>/', views.ValidationHierarchie.as_view(), name="validation-hierarchique-demande"),
    path('demandes/valider-securite/<int:id>/', views.ValidationSecurite.as_view(), name="validation-securite-demande"),
    path('demandes/valider-admin/<int:id>/', views.ValidationAdmin.as_view(), name="validation-admin-demande"),


    path('demandes/refus-hierarchie/<int:id>/', views.RefusHierarchie.as_view(), name="validation-hierarchique-demande"),
    path('demandes/refus-securite/<int:id>/', views.RefusSecurite.as_view(), name="validation-securite-demande"),

]
