from django.shortcuts import render, get_object_or_404
from .models import Review
from .serializers import ReviewSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from accounts.permissions import IsCustomer
from buses.models import Bus
from bookings.models import Booking
from rest_framework.exceptions import ValidationError, PermissionDenied


class ReviewCreateView(generics.CreateAPIView):
    permission_classes = [IsCustomer]
    serializer_class = ReviewSerializer
    
    def perform_create(self, serializer):
        bus_id = self.kwargs.get('bus_id')
        bus = get_object_or_404(Bus, id=bus_id)
        
        has_booked = Booking.objects.filter(user=self.request.user, schedule__bus=bus, booking_status='confirmed').exists()
        
        if not has_booked:
            raise PermissionDenied('You can only review buses you booked')
        
        if Review.objects.filter(user=self.request.user, bus=bus).exists():
            raise ValidationError('You have already reviewed this bus')
        
        serializer.save(user=self.request.user, bus=bus)


class ReviewUpdateView(generics.UpdateAPIView):
    permission_classes = [IsCustomer]
    serializer_class = ReviewSerializer
    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)


class ReviewDeleteView(generics.DestroyAPIView):
    permission_classes = [IsCustomer]
    serializer_class = ReviewSerializer
    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)


class BusReviewsView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ReviewSerializer
    def get_queryset(self):
        bus_id = self.kwargs.get('bus_id')
        return Review.objects.filter(bus_id=bus_id).order_by('-created_at')