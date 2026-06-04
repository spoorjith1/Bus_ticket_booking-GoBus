from django.shortcuts import render
from .models import User
from rest_framework import generics
from .serializers import RegistrationSerializer
from rest_framework.permissions import AllowAny


class UserRegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer
    queryset = User.objects.all()