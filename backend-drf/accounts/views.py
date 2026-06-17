from django.shortcuts import render
from .models import User
from rest_framework import generics
from .serializers import UserRegistrationSerializer, UserProfileViewSerializer, UserProfileEditSerializer, AddCoinsSerializer
from rest_framework.permissions import AllowAny
from accounts.permissions import IsCustomer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class UserRegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()


class OwnProfileView(generics.RetrieveAPIView):
    permission_classes = [IsCustomer]
    serializer_class = UserProfileViewSerializer
    queryset = User.objects.all()
    
    def get_object(self):
        return self.request.user


class OwnProfileEditView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsCustomer]
    serializer_class = UserProfileEditSerializer
    queryset = User.objects.all()
    
    def get_object(self):
        return self.request.user
    
    def patch(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class OwnProfileDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsCustomer]
    
    def get_object(self):
        return self.request.user


class AddCoinsView(APIView):
    permission_classes = [IsCustomer]
    def patch(self, request):
        serializer = AddCoinsSerializer(data=request.data)
        if serializer.is_valid():
            amount = serializer.validated_data['amount']
            request.user.wallet_balance += amount
            request.user.save()
            return Response({'wallet_balance': request.user.wallet_balance}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)