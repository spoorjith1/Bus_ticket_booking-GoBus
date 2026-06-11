from django.db import models
from operators.models import Operator


class Bus(models.Model):
    operator = models.ForeignKey(Operator, on_delete=models.CASCADE)
    bus_number = models.CharField(max_length=10)
    bus_name = models.CharField(max_length=50)
    bus_types = (
        ('ac_bus', 'ACBus'),
        ('luxury', 'Luxury'),
        ('regular', 'Regular'),
    )
    bus_type = models.CharField(max_length=20, choices=bus_types, default='regular')
    total_seats = models.IntegerField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.operator} - {self.bus_number}"