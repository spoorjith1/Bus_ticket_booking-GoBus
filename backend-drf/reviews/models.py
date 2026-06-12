from django.db import models
from accounts.models import User
from buses.models import Bus

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='reviews')
    RATING_CHOICES = (
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars')
    )
    rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'bus'], name='unique_review_per_user_per_bus')
        ]
    
    def __str__(self):
        return f"{self.bus} - {self.user}"