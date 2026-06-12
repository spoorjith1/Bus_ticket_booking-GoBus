from django.db import models
from accounts.models import User
from schedules.models import Schedule

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='bookings')
    
    fare_amount = models.DecimalField(max_digits=10, decimal_places=2)
    tax_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    booking_status_choices = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled')
    )
    booking_status = models.CharField(max_length=20 ,choices=booking_status_choices, default='pending')
    booked_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user} {self.schedule}"