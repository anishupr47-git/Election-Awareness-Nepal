from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import candidates_list, opinion_summary, cast_vote, me, register
from .views_setup import setup_db

urlpatterns = [
    path("candidates/", candidates_list),
    path("opinion/", opinion_summary),
    path("vote/", cast_vote),
    path("me/", me),
    path("auth/register/", register),
    path("auth/token/", TokenObtainPairView.as_view()),
    path("auth/token/refresh/", TokenRefreshView.as_view()),
    path("setup/", setup_db),
]
