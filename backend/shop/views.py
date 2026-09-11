from django.http import JsonResponse
import json
from .models import Product, Order

PRODUCT_FIELDS = ("id", "title", "subtitle", "description", "image", "price_ore")

def products(request):
    """GET /api/products -> {"products": [...]}"""
    return JsonResponse({"products": list(Product.objects.values(*PRODUCT_FIELDS))})

# TODO: A view that creates an order.
def getOrderIDs(request) -> list:
    return list(Order.objects.values_list("id", flat=True))

def createOrder(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed."}, status=405)
    data = json.loads(request.body)
    total_price_ore = data.get("total_price_ore")
    products = data.get("products", [])
    order = Order.objects.create(total_price_ore=total_price_ore, products=products)
    return JsonResponse({"order_id": order.id}, status=201)