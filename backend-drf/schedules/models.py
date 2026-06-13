from django.db import models
from buses.models import Bus
from routes.models import Route

class Schedule(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='schedules')
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='schedules')
    
    departure_datetime = models.DateTimeField()
    arrival_datetime = models.DateTimeField()
    
    fare = models.PositiveIntegerField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.bus} - {self.route}"