from django.shortcuts import render, get_object_or_404
from .serializers import BusSerializer
from .models import Bus
from accounts.permissions import IsOperator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BusCreateView(APIView):
    permission_classes = [IsOperator]
    def post(self, request):
        serializer = BusSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(operator=request.user.operator)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class BusUpdateView(APIView):
    permission_classes = [IsOperator]
    def patch(self, request, id):
        bus = get_object_or_404(Bus, id=id, operator=request.user.operator)
        serializer = BusSerializer(bus, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BusDetailView(APIView):
    permission_classes = [IsOperator]
    def get(self, request, id):
        bus = get_object_or_404(Bus, id=id, operator=request.user.operator)
        serializer = BusSerializer(bus)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BusListView(APIView):
    permission_classes = [IsOperator]
    def get(self, request):
        buses = Bus.objects.filter(operator=request.user.operator)
        serializer = BusSerializer(buses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BusDeleteView(APIView):
    permission_classes = [IsOperator]
    def delete(self, request, id):
        bus = get_object_or_404(Bus, id=id, operator=request.user.operator)
        bus.delete()
        return Response({'message': 'bus deleted successfully'}, status=status.HTTP_200_OK)