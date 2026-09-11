from django.db import models


class Product(models.Model):
    """Seeded from products.json. Money is stored as integer øre (3090 == 30,90 kr).

    `id` is the id straight from products.json, so re-seeding updates rows
    instead of duplicating them.
    """

    id = models.CharField(primary_key=True, max_length=64)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    image = models.URLField(max_length=500)
    price_ore = models.PositiveIntegerField()

    def __str__(self):
        return self.title


# TODO: An order, and the items on it. Give them real fields, then run
# `makemigrations shop && migrate`.

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    total_price_ore = models.PositiveIntegerField()
    products = models.JSONField(default = list)
    



