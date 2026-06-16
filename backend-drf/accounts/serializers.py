from rest_framework import serializers
from .models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        
    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('This eamil already exists')
        return value
    
    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError('The username is not available')
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        return User.objects.create_user(password=password, **validated_data)
    

class UserProfileViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id' ,'profile_pic' ,'username', 'first_name', 'last_name', 'email', 'mobile_no', 'role']


class UserProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'mobile_no']
    
    def validate_email(self, value):
        user = self.instance
        if user and User.objects.filter(email__iexact=value).exclude(id=user.id).exists():
            raise serializers.ValidationError('The email already exists')
        return value
    
    def validate_username(self, value):
        user = self.instance
        if User.objects.filter(username__iexact=value).exclude(id=user.id).exists():
            raise serializers.ValidationError('The username is taken')
        return value


class AddCoinsSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError('Amount must be greater than 0')
        if value > 10000:
            raise serializers.ValidationError('Maximum 10000 coins can be added at once')
        return value