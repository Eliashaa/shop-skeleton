from django.urls import path

from . import views

urlpatterns = [
    path("products", views.products), path("orders/create", views.createOrder)
]

# Add any other URL you need here.
