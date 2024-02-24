from django.urls import path

from . import views

urlpatterns = [
    path("core/", view=views.index, name="index")
]
