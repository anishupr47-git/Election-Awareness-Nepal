from django.contrib.auth.models import User
from django.db import transaction
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Candidate, Vote


@api_view(["GET"])
@permission_classes([AllowAny])
def candidates_list(request):
    data = []
    for c in Candidate.objects.all().order_by("display_name"):
        data.append(
            {
                "id": c.id,
                "display_name": c.display_name,
                "image_path": c.image_path,  # frontend will do: /assets/{image_path}
                "support_count": c.support_count,
            }
        )
    return Response(data)


@api_view(["GET"])
@permission_classes([AllowAny])
def opinion_summary(request):
    items = []
    total = Vote.objects.count()

    # Build counts per candidate
    for c in Candidate.objects.all().order_by("display_name"):
        cnt = Vote.objects.filter(candidate=c).count()
        items.append({"candidate_id": c.id, "label": c.display_name, "count": cnt})

    return Response({"total": total, "items": items})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cast_vote(request):
    candidate_id = request.data.get("candidate_id")
    if not candidate_id:
        return Response({"detail": "candidate_id required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        candidate = Candidate.objects.get(id=candidate_id)
    except Candidate.DoesNotExist:
        return Response({"detail": "Candidate not found"}, status=status.HTTP_404_NOT_FOUND)

    # Atomic: prevents double click / race conditions from creating double votes
    with transaction.atomic():
        existing = Vote.objects.select_for_update().filter(user=request.user).first()
        if existing:
            return Response(
                {"detail": "You already voted", "candidate_id": existing.candidate_id},
                status=status.HTTP_409_CONFLICT,
            )

        Vote.objects.create(user=request.user, candidate=candidate)

    return Response(
        {"candidate_id": candidate.id, "support_count": Vote.objects.filter(candidate=candidate).count()},
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    u = request.user
    return Response(
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "is_staff": u.is_staff,
            "is_superuser": u.is_superuser,
        }
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = (request.data.get("username") or "").strip()
    email = (request.data.get("email") or "").strip()
    password = (request.data.get("password") or "").strip()

    if not username or not password:
        return Response({"detail": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"detail": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"id": user.id, "username": user.username, "email": user.email}, status=status.HTTP_201_CREATED)
