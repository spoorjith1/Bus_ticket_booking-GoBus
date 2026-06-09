from django.db import models
from accounts.models import User

class Operator(models.Model):
    op_user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='operator')
    op_name = models.CharField(max_length=100)
    op_logo = models.ImageField(upload_to='operator_logos/', blank=True, null=True, default='default.png')
    op_email = models.EmailField(unique=True)
    op_mobile_no1 = models.CharField(max_length=15)
    op_mobile_no2 = models.CharField(max_length=15, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    is_verified = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.op_name}"