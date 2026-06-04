from django.urls import path
from accounts.views import UserRegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    #Register
    path('register/', UserRegisterView.as_view(), name='user_registration'),
   
    #Login
    path('token/', TokenObtainPairView.as_view(), name='access_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
]