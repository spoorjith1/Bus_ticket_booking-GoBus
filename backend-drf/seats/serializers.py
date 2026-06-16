from rest_framework import serializers
from .models import Seat
from booking_seats.models import BookingSeat


class SeatSerializer(serializers.ModelSerializer):
    is_booked = serializers.SerializerMethodField()
    
    class Meta:
        model = Seat
        fields= ['id', 'bus', 'seat_number', 'is_booked']
    
    def get_is_booked(self, obj):
        schedule = self.context.get('schedule')
        return BookingSeat.objects.filter(seat=obj, booking__schedule=schedule, booking__booking_status='confirmed').exists()