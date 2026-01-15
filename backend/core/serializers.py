from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Candidate, Vote

User = get_user_model()

class CandidateSerializer(serializers.ModelSerializer):
    support_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Candidate
        fields = ["id", "slug", "display_name", "short_title", "image_key", "is_active", "support_count"]

class MeSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "is_admin"]

    def get_is_admin(self, obj):
        return bool(obj.is_staff or obj.is_superuser)

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user

class VoteCreateSerializer(serializers.Serializer):
    candidate_id = serializers.IntegerField()

    def validate_candidate_id(self, value):
        if not Candidate.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError("Candidate not found.")
        return value
