from django.contrib import admin
from .models import Candidate, Vote


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ("id", "display_name", "image_path", "created_at")
    search_fields = ("display_name",)
    ordering = ("display_name",)


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "candidate", "created_at")
    search_fields = ("user__username", "candidate__display_name")
    ordering = ("-created_at",)
