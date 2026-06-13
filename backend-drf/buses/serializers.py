from rest_framework import serializers
from .models import Bus
from seats.models import Seat

class BusSerializer(serializers.ModelSerializer):
    operator = serializers.ReadOnlyField(source='operator.op_name')
    class Meta:
        model = Bus
        fields = ['id', 'operator', 'bus_number', 'bus_name', 'bus_type', 'total_seats']
    
    def validate_bus_number(self, value):
        bus = self.instance
        qs = Bus.objects.filter(bus_number__iexact=value)
        if bus:
            qs = qs.exclude(id=bus.id)
        if qs.exists():
            raise serializers.ValidationError('The bus number already exists')
        return value
    
    def validate_total_seats(self, value):
        if value <= 0:
            raise serializers.ValidationError('Total seats must be greater than 0')
        return value
        
    def create(self, validated_data):
        bus = Bus.objects.create(**validated_data)
        
        for i in range(1, bus.total_seats + 1):
            Seat.objects.create(bus=bus, seat_number=f"A{i}")
        return bus