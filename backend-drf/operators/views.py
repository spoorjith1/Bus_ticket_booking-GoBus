from django.shortcuts import render, get_object_or_404
from .serializers import OperatorSerializer
from .models import Operator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from accounts.permissions import IsAdmin, IsOperator


class OperatorCreateView(APIView):
    permission_classes = [IsAdmin]
    def post(self, request):
        user_id = request.data.get('user_id')
        user = get_object_or_404(User, id=user_id)
        
        if user.role == 'admin':
            return Response({'error': 'Admin cannot be an operator'}, status=status.HTTP_400_BAD_REQUEST)
        
        if hasattr(user, 'operator'):
            return Response({'error': 'This user is already an operator'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = OperatorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(op_user=user)
            user.role = 'operator'
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OperatorUpdateView(APIView):
    permission_classes = [IsOperator]
    def patch(self, request):
        operator = request.user.operator
        serializer = OperatorSerializer(operator, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OperatorProfileView(APIView):
    permission_classes = [IsOperator]
    def get(self, request):
        operator = request.user.operator
        serializer = OperatorSerializer(operator)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OperatorDeleteView(APIView):
    permission_classes = [IsAdmin]
    def delete(self, request, id):
        operator = get_object_or_404(Operator, id=id)
        operator.op_user.role = 'customer'
        operator.op_user.save()
        operator.delete()
        return Response({'message': 'Operator deleted'}, status=status.HTTP_200_OK)


class OperatorListView(APIView):
    permission_classes = [IsAdmin]
    def get(self, request):
        operators = Operator.objects.all()
        serializer = OperatorSerializer(operators, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)