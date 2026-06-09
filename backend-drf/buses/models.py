from django.db import models
from operators.models import Operator


class Bus(models.Model):
    operator = models.ForeignKey(Operator, on_delete=models.CASCADE)