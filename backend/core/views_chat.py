import os
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(["POST"])
@permission_classes([AllowAny])
def chat_view(request):
    token = os.getenv("HF_API_TOKEN", "").strip()
    if not token:
        return Response(
            {"reply": "AI is not configured yet. Add HF_API_TOKEN on server."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    msg = (request.data.get("message") or "").strip()
    if not msg:
        return Response({"reply": "Send a message."}, status=status.HTTP_400_BAD_REQUEST)

    
    model = os.getenv("HF_MODEL", "HuggingFaceH4/zephyr-7b-beta")
    url = f"https://api-inference.huggingface.co/models/{model}"

    try:
        r = requests.post(
            url,
            headers={"Authorization": f"Bearer {token}"},
            json={"inputs": msg},
            timeout=30,
        )
        if r.status_code >= 400:
            return Response(
                {"reply": "AI is temporarily unavailable."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        data = r.json()
        
        if isinstance(data, list) and data and isinstance(data[0], dict) and "generated_text" in data[0]:
            return Response({"reply": data[0]["generated_text"]})
        if isinstance(data, dict) and "generated_text" in data:
            return Response({"reply": data["generated_text"]})

        return Response({"reply": "AI is temporarily unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    except Exception:
        return Response({"reply": "AI is temporarily unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
