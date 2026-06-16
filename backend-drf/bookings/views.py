from django.shortcuts import render, get_object_or_404
from .models import Booking
from .serializers import BookingSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.permissions import IsCustomer
from decimal import Decimal
from schedules.models import Schedule
from seats.models import Seat
from booking_seats.models import BookingSeat


class BookingSummaryView(APIView):
    permission_classes = [IsCustomer]
    def post(self, request):
        schedule_id = request.data.get('schedule')
        seat_ids = request.data.get('seat_ids', [])
        
        if not schedule_id:
            return Response({'error': 'Schedule is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not seat_ids:
            return Response({'error': 'Please select atleast one seat'}, status=status.HTTP_400_BAD_REQUEST)
        
        schedule = get_object_or_404(Schedule, id=schedule_id)
        seats = Seat.objects.filter(id__in=seat_ids, bus=schedule.bus)
        
        if seats.count() != len(seat_ids):
            return Response({'error': 'Invalid seats selected'}, status=status.HTTP_400_BAD_REQUEST)
        
        booked_seats = []
        
        for seat in seats:
            already_booked = BookingSeat.objects.filter(seat=seat, booking__schedule=schedule, booking__booking_status='confirmed').exists()
            if already_booked:
                booked_seats.append(seat.seat_number)
        
        if booked_seats:
            return Response({'error': 'seats are already booked', 'booked_seats': booked_seats}, status=status.HTTP_400_BAD_REQUEST)
        
        seat_numbers = list(seats.values_list('seat_number', flat=True))
        fare_amount = (Decimal(schedule.fare) * len(seat_ids))
        tax_percentage = Decimal('5.00')
        tax_amount = (fare_amount * tax_percentage) / Decimal('100')
        total_amount = (fare_amount + tax_amount)
        
        return Response({
            'schedule_id': schedule.id, 'bus_name': schedule.bus.bus_name, 'bus_number': schedule.bus.bus_number,
            'source': schedule.route.source, 'destination': schedule.route.destination, 'seat_numbers': seat_numbers,
            'fare_per_seat': schedule.fare, 'number_of_seats': len(seat_ids), 'fare_amount': fare_amount,
            'tax_percentage': tax_percentage, 'tax_amount': tax_amount, 'total_amount': total_amount
            }, status=status.HTTP_200_OK)