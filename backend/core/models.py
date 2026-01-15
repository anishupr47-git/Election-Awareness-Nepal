from django.conf import settings
from django.db import models


class Candidate(models.Model):
    display_name = models.CharField(max_length=120)
    image_path = models.CharField(max_length=255, blank=True, default="") 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.display_name

    @property
    def support_count(self):
        return self.votes.count()


class Vote(models.Model):
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="vote")
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name="votes")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} -> {self.candidate}"
