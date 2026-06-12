from django.db import models
from bookings.models import Booking
from seats.models import Seat

class BookingSeat(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='booking_seats')
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE, related_name='booking_seats')
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['booking', 'seat'], name='unique_seat_per_booking')
        ]
    
    def __str__(self):
        return f"{self.booking} - {self.seat}"