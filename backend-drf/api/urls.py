from django.urls import path
from accounts import views as AccViews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    #Register
    path('register/', AccViews.UserRegisterView.as_view(), name='user_registration'),
   
    #Login
    path('token/', TokenObtainPairView.as_view(), name='access_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    
    
    #User Profile View & Edit
    path('profile/me/', AccViews.OwnProfileView.as_view(), name='user_profile'),
    path('profile/me/edit/', AccViews.OwnProfileEditView.as_view(), name='user_profile_edit'),
]