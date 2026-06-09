from django.shortcuts import render
from .models import User
from rest_framework import generics
from .serializers import UserRegistrationSerializer, UserProfileViewSerializer, UserProfileEditSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserRegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()


class OwnProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileViewSerializer
    queryset = User.objects.all()
    
    def get_object(self):
        return self.request.user


class OwnProfileEditView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileEditSerializer
    queryset = User.objects.all()
    
    def get_object(self):
        return self.request.user
    
    def patch(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)