from rest_framework import serializers
from .models import Schedule
from booking_seats.models import BookingSeat


class ScheduleSerializer(serializers.ModelSerializer):
    total_duration = serializers.SerializerMethodField()
    available_seats = serializers.SerializerMethodField()
    bus_name = serializers.ReadOnlyField(source='bus.bus_name')
    bus_number = serializers.ReadOnlyField(source='bus.bus_number')
    bus_operator = serializers.ReadOnlyField(source='bus.operator.op_name')
    bus_type = serializers.ReadOnlyField(source='bus.bus_type')
    source = serializers.ReadOnlyField(source='route.source')
    destination = serializers.ReadOnlyField(source='route.destination')
    distance = serializers.ReadOnlyField(source='route.distance')
    class Meta:
        model = Schedule
        fields = ['id', 'bus', 'route', 'departure_datetime', 'arrival_datetime', 'fare', 'total_duration', 'available_seats', 'bus_name', 'bus_number', 'bus_operator', 'bus_type', 'source', 'destination', 'distance']
    
    def get_total_duration(self, obj):
        duration = obj.arrival_datetime - obj.departure_datetime
        total_seconds = int(duration.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        return f"{hours}h {minutes}m"
    
    def get_available_seats(self, obj):
        total_seats = obj.bus.total_seats
        booked_seats = BookingSeat.objects.filter(
            booking__schedule=obj,
            booking__booking_status='confirmed'
        ).count()
        
        return total_seats - booked_seats