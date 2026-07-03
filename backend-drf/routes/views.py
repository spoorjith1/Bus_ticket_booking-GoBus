from django.shortcuts import render
from .serializers import RouteSerializer
from .models import Route
from rest_framework import generics
from accounts.permissions import IsAdmin, IsAdminOrIsOperator

class RouteCreateView(generics.CreateAPIView):
    permission_classes = [IsAdmin]
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

class RouteUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAdmin]
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

class RouteDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAdmin]
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

class RouteListView(generics.ListAPIView):
    permission_classes = [IsAdminOrIsOperator]
    serializer_class = RouteSerializer
    queryset = Route.objects.all().order_by('-created_at')

class RouteDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAdminOrIsOperator]
    serializer_class = RouteSerializer
    queryset = Route.objects.all()