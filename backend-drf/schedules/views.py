from django.shortcuts import render, get_object_or_404
from .serializers import ScheduleSerializer
from .models import Schedule
from buses.models import Bus
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.permissions import IsOperator
from rest_framework.permissions import AllowAny
from django.utils import timezone
from rest_framework import generics


class ScheduleCreateView(APIView):
    permission_classes = [IsOperator]
    def post(self, request):
        bus_id = request.data.get('bus')
        get_object_or_404(Bus, id=bus_id, operator=request.user.operator)
        serializer = ScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ScheduleUpdateView(APIView):
    permission_classes = [IsOperator]
    def patch(self, request, id):
        schedule = get_object_or_404(Schedule, id=id, bus__operator=request.user.operator)
        serializer = ScheduleSerializer(schedule, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ScheduleDeleteView(APIView):
    permission_classes = [IsOperator]
    def delete(self, request, id):
        schedule = get_object_or_404(Schedule, id=id, bus__operator=request.user.operator)
        schedule.delete()
        return Response({'message': 'Schedule deleted successfully'}, status=status.HTTP_200_OK)


class OperatorSchedulesListView(APIView):
    permission_classes = [IsOperator]
    def get(self, request):
        schedules = Schedule.objects.filter(bus__operator=request.user.operator).order_by('departure_datetime')
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OperatorSchedulesDetailView(APIView):
    permission_classes = [IsOperator]
    def get(self, request, id):
        schedule = get_object_or_404(Schedule, id=id, bus__operator=request.user.operator)
        serializer = ScheduleSerializer(schedule)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ScheduleListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ScheduleSerializer
    def get_queryset(self):
        return Schedule.objects.filter(departure_datetime__gte=timezone.now()).order_by('departure_datetime')


class ScheduleDetailView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, id):
        schedule = get_object_or_404(Schedule, id=id)
        serializer = ScheduleSerializer(schedule)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ScheduleSearchView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        source = request.GET.get('source')
        destination = request.GET.get('destination')
        journey_date = request.GET.get('journey_date')
        
        min_price = request.GET.get('min_price')
        max_price = request.GET.get('max_price')
        
        sort_by = request.GET.get('sort_by')
        
        schedules = Schedule.objects.filter(
            route__source__icontains=source,
            route__destination__icontains=destination,
            departure_datetime__date=journey_date,
            departure_datetime__gte=timezone.now()
        )
        if min_price:
            schedules = schedules.filter(fare__gte=min_price)
        if max_price:
            schedules = schedules.filter(fare__lte=max_price)
        if sort_by == 'price_low':
            schedules = schedules.order_by('fare')
        elif sort_by == 'price_high':
            schedules = schedules.order_by('-fare')
        elif sort_by == 'departure_early':
            schedules = schedules.order_by('departure_datetime')
        elif sort_by == 'departure_late':
            schedules = schedules.order_by('-departure_datetime')
            
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)