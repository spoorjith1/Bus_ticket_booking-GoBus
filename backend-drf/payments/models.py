from django.db import models
from bookings.models import Booking

class Payment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    payment_id = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    PAYMENT_METHODS = (
        ('upi', 'UPI'),
        ('credit_card', 'Credit card'),
        ('debit_card', 'Debit card')
    )
    payment_method = models.CharField(max_length=30, choices=PAYMENT_METHODS, default='upi')
    PAYMENT_STATUS = (
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed')
    )
    payment_status = models.CharField(max_length=30, choices=PAYMENT_STATUS, default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.payment_id} - {self.payment_status}"