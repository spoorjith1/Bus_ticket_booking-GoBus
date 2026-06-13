from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts import views as AccViews
from operators import views as OperatorViews
from buses import views as BusViews


urlpatterns = [
    #Register
    path('register/', AccViews.UserRegisterView.as_view(), name='user_registration'),
   
    #Login
    path('token/', TokenObtainPairView.as_view(), name='access_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    
    
    #User Profile View & Edit
    path('profile/me/', AccViews.OwnProfileView.as_view(), name='user_profile'),
    path('profile/me/edit/', AccViews.OwnProfileEditView.as_view(), name='user_profile_edit'),
    
    #Operator
    path('operator/create/', OperatorViews.OperatorCreateView.as_view(), name='create_operator'),
    path('operator/me/update/', OperatorViews.OperatorUpdateView.as_view(), name='update_operator'),
    path('operator/me/profile/', OperatorViews.OperatorProfileView.as_view(), name='view_operator'),
    path('operator/<int:id>/delete/', OperatorViews.OperatorDeleteView.as_view(), name='delete_operator'),
    
    #Buses
    path('operator/buses/create/', BusViews.BusCreateView.as_view(), name='create_bus'),
    path('operator/buses/<int:id>/update/', BusViews.BusUpdateView.as_view(), name='update_bus'),
    path('operator/buses/<int:id>/delete/', BusViews.BusDeleteView.as_view(), name='delete_bus'),
    path('operator/buses/list/', BusViews.BusListView.as_view(), name='bus_list'),
    path('operator/buses/<int:id>/detail/', BusViews.BusDetailView.as_view(), name='bus_detail'),
]