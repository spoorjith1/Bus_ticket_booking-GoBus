from rest_framework import serializers
from .models import Booking
from booking_seats.models import BookingSeat


class BookingSerializer(serializers.ModelSerializer):
    seat_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    source = serializers.ReadOnlyField(source='schedule.route.source')
    destination = serializers.ReadOnlyField(source='schedule.route.destination')
    distance = serializers.ReadOnlyField(source='schedule.route.distance')
    bus_name = serializers.ReadOnlyField(source='schedule.bus.bus_name')
    bus_number = serializers.ReadOnlyField(source='schedule.bus.bus_number')
    seat_numbers = serializers.SerializerMethodField()
    class Meta:
        model = Booking
        fields = ['id' ,'schedule', 'seat_ids', 'bus_name', 'bus_number', 'source', 'destination', 'distance', 'seat_numbers', 'fare_amount', 'tax_percentage', 'tax_amount', 'total_amount', 'booking_status', 'booked_at']
        read_only_fields = ['fare_amount', 'tax_percentage', 'tax_amount', 'total_amount', 'booking_status', 'booked_at']
    
    def get_seat_numbers(self, obj):
        return list(obj.booking_seats.values_list('seat__seat_number', flat=True))