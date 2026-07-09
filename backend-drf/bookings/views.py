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
from django.db import transaction


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
            'operator_name': schedule.bus.operator.op_name,
            'source': schedule.route.source, 'destination': schedule.route.destination, 'departure_datetime': schedule.departure_datetime,
            'arrival_datetime': schedule.arrival_datetime,'seat_numbers': seat_numbers,
            'fare_per_seat': schedule.fare, 'number_of_seats': len(seat_ids), 'fare_amount': fare_amount,
            'tax_percentage': tax_percentage, 'tax_amount': tax_amount, 'total_amount': total_amount, 
            'wallet_balance': request.user.wallet_balance
            }, status=status.HTTP_200_OK)



class PayWithCoinsView(APIView):
    permission_classes = [IsCustomer]
    
    @transaction.atomic
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
        
        for seat in seats:
            already_booked = BookingSeat.objects.filter(seat=seat, booking__schedule=schedule, booking__booking_status='confirmed').exists()
            if already_booked:
                return Response({'error': f'{seat.seat_number} is already booked'}, status=status.HTTP_400_BAD_REQUEST)
        
        fare_amount = Decimal(schedule.fare) * len(seat_ids)
        tax_percentage = Decimal('5.00')
        tax_amount = (fare_amount * tax_percentage) / Decimal('100')
        total_amount = fare_amount + tax_amount
        
        if request.user.wallet_balance < total_amount:
            return Response({'error': 'Insufficient wallet balance, please add more coins'}, status=status.HTTP_400_BAD_REQUEST)
        
        request.user.wallet_balance = request.user.wallet_balance - total_amount
        request.user.save()
        
        booking = Booking.objects.create(
            user = request.user,
            schedule = schedule,
            fare_amount = fare_amount,
            tax_percentage = tax_percentage,
            tax_amount = tax_amount,
            total_amount = total_amount,
            booking_status='confirmed'
        )
        
        for seat in seats:
            BookingSeat.objects.create(booking=booking, seat=seat)
        
        serializer = BookingSerializer(booking)
        
        return Response({'message': 'Booking confirmed',
                         'remaining_wallet_balance': request.user.wallet_balance,
                         'booking': serializer.data}, status=status.HTTP_201_CREATED)


class BookingsListView(APIView):
    permission_classes = [IsCustomer]
    def get(self, request):
        bookings = Booking.objects.filter(user=request.user).order_by('-booked_at')
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BookinDetailview(APIView):
    permission_classes = [IsCustomer]
    def get(self, request, id):
        booking = get_object_or_404(Booking, id=id, user=request.user)
        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=status.HTTP_200_OK)