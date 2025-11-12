# subscribers/views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import requests
import json

@csrf_exempt
def subscribe(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            print("Received email:", email)

            response = requests.post(
                "https://api.buttondown.email/api/subscribers",
                headers={
                    "Authorization": "Token 344826c6-a5e0-4f70-8a59-d2e05f47d673",
                    "Content-Type": "application/json"
                },
                json={"email_address": email}
            )

            print("Buttondown response:", response.status_code, response.text)

            # Try to parse JSON response safely
            try:
                return JsonResponse(response.json(), status=response.status_code)
            except ValueError:
                return JsonResponse({"error": "Invalid response from Buttondown"}, status=500)

        except Exception as e:
            print("Error during subscription:", str(e))
            return JsonResponse({"error": "Subscription failed"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)