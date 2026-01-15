import os
from django.http import JsonResponse
from django.core.management import call_command
from django.views.decorators.http import require_http_methods

@require_http_methods(["POST"])
def setup_db(request):
    token = request.headers.get("X-SETUP-TOKEN", "")
    if not token or token != os.getenv("SETUP_TOKEN", ""):
        return JsonResponse({"detail": "Unauthorized"}, status=401)

    call_command("migrate", interactive=False)
    call_command("seed_candidates")
    return JsonResponse({"status": "ok"})
