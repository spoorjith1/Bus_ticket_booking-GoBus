from rest_framework import serializers
from .models import Operator


class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operator
        fields = ['op_name', 'op_logo', 'op_email', 'op_mobile_no1', 'op_mobile_no2', 'is_verified']
    
    def validate_op_name(self, value):
        operator = self.instance
        qs = Operator.objects.filter(op_name__iexact=value)
        if operator:
            qs = qs.exclude(id=operator.id)
        if qs.exists():
            raise serializers.ValidationError('This name already exists')
        return value
    
    def validate_op_email(self, value):
        operator = self.instance
        qs = Operator.objects.filter(op_email__iexact=value)
        if operator:
            qs = qs.exclude(id=operator.id)
        if qs.exists():
            raise serializers.ValidationError('This email already exists')
        return value
    
    def validate_op_mobile_no1(self, value):
        operator = self.instance
        qs = Operator.objects.filter(op_mobile_no1=value)
        if operator:
            qs = qs.exclude(id=operator.id)
        if qs.exists():
            raise serializers.ValidationError('This mobile number already exists')
        return value
    
    def validate_op_mobile_no2(self, value):
        operator = self.instance
        qs = Operator.objects.filter(op_mobile_no2=value)
        if operator:
            qs = qs.exclude(id=operator.id)
        if qs.exists():
            raise serializers.ValidationError('This mobile number already exists')
        return value


class OperatorListSerializer(serializers.ModelSerializer):
    op_username = serializers.CharField(source='op_user.username', read_only=True)
    class Meta:
        model = Operator
        fields = ['op_username', 'op_name', 'op_logo', 'op_email', 'op_mobile_no1', 'op_mobile_no2', 'is_verified']