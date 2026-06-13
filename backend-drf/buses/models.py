from django.db import models
from operators.models import Operator

class Bus(models.Model):
    operator = models.ForeignKey(Operator, on_delete=models.CASCADE, related_name='buses')
    bus_number = models.CharField(max_length=20, unique=True)
    bus_name = models.CharField(max_length=100)
    BUS_TYPES = (
        ('sleeper', 'Sleeper'),
        ('ac_bus', 'AC Bus'),
        ('luxury', 'Luxury'),
        ('regular', 'Regular'),
    )
    bus_type = models.CharField(max_length=20, choices=BUS_TYPES, default='regular')
    total_seats = models.PositiveIntegerField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.operator} - {self.bus_number}"