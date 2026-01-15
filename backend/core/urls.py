from django.urls import path
from .views import CandidateListView, OpinionView
from .views_auth import LoginView, RegisterView
from .views_setup import setup_db

urlpatterns = [
    path("candidates/", CandidateListView.as_view()),
    path("opinion/", OpinionView.as_view()),
    path("login/", LoginView.as_view()),
    path("register/", RegisterView.as_view()),
    path("setup/", setup_db),
]
