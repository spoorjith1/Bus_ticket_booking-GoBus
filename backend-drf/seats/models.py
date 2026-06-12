from django.db import models
from buses.models import Bus

class Seat(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.CharField(max_length=10)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['bus', 'seat_number'], name='unique_seat_per_bus')
        ]
    
    def __str__(self):
        return f"{self.bus} - {self.seat_number}"