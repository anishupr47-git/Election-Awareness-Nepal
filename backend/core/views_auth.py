from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
  username = request.data.get("username", "").strip()
  email = request.data.get("email", "").strip()
  password = request.data.get("password", "").strip()
  if not username or not password:
    return Response({"detail": "username and password required"}, status=status.HTTP_400_BAD_REQUEST)
  if User.objects.filter(username=username).exists():
    return Response({"detail": "username already exists"}, status=status.HTTP_400_BAD_REQUEST)
  user = User.objects.create_user(username=username, email=email, password=password)
  return Response({"id": user.id, "username": user.username, "email": user.email}, status=status.HTTP_201_CREATED)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
  u = request.user
  return Response({"id": u.id, "username": u.username, "email": u.email, "is_staff": u.is_staff})
