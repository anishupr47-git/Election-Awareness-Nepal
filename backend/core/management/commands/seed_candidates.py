from django.core.management.base import BaseCommand
from core.models import Candidate

CANDIDATES = [
    ("Balen Shah", "candidates/balenshah.jpg"),
    ("Gagan Thapa", "candidates/gagan.jpg"),
    ("Harka Sampang", "candidates/harka.jpg"),
    ("K.P. Oli", "candidates/kpoli.jpg"),
    ("Kulman Ghising", "candidates/kulman.jpg"),
    ("Mahesh Basnet", "candidates/mahesh.jpg"),
    ("Prachanda", "candidates/prachanda.jpg"),
    ("Sher Bahadur Deuba", "candidates/sherey.jpg"),
]

class Command(BaseCommand):
    help = "Create default candidates if they do not exist."

    def handle(self, *args, **options):
        created = 0

        for name, img in CANDIDATES:
            obj, was_created = Candidate.objects.get_or_create(
                display_name=name,
                defaults={"image_path": img},
            )
            if was_created:
                created += 1

        self.stdout.write(self.style.SUCCESS(f"Done. Created {created} candidates."))

