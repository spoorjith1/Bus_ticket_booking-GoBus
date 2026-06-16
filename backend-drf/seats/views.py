from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from schedules.models import Schedule
from .models import Seat
from .serializers import SeatSerializer


class ScheduleSeatsView(APIView):
    def get(self, request, schedule_id):
        schedule = get_object_or_404(Schedule, id=schedule_id)
        seats = Seat.objects.filter(bus=schedule.bus).order_by('seat_number')
        serializer = SeatSerializer(seats, many=True, context={'schedule': schedule})
        return Response(serializer.data, status=status.HTTP_200_OK)