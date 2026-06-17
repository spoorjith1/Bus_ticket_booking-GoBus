from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    bus_name = serializers.ReadOnlyField(source='bus.bus_name')
    class Meta:
        model = Review
        fields = ['id', 'user', 'bus', 'bus_name', 'rating', 'comment', 'created_at']