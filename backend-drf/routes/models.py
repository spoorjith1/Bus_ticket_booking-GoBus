from django.db import models

class Route(models.Model):
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    distance = models.IntegerField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.source} - {self.destination}"