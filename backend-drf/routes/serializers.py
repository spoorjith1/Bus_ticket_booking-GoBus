from rest_framework import serializers
from .models import Route

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'
    
    def validate(self, attrs):
        if attrs['source'].lower() == attrs['destination'].lower():
            raise serializers.ValidationError('source and destination should not be same')
        return attrs