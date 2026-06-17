from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts import views as AccViews
from operators import views as OperatorViews
from buses import views as BusViews
from routes import views as RouteViews
from schedules import views as ScheduleViews
from seats.views import ScheduleSeatsView
from bookings import views as BookingViews


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
    path('operator/list/', OperatorViews.OperatorListView.as_view(), name='operator_list'),
    
    #Buses
    path('operator/buses/create/', BusViews.BusCreateView.as_view(), name='create_bus'),
    path('operator/buses/<int:id>/update/', BusViews.BusUpdateView.as_view(), name='update_bus'),
    path('operator/buses/<int:id>/delete/', BusViews.BusDeleteView.as_view(), name='delete_bus'),
    path('operator/buses/list/', BusViews.BusListView.as_view(), name='bus_list'),
    path('operator/buses/<int:id>/detail/', BusViews.BusDetailView.as_view(), name='bus_detail'),
    
    #Routes
    path('routes/create/', RouteViews.RouteCreateView.as_view(), name='create_route'),
    path('routes/<int:id>/update/', RouteViews.RouteUpdateView.as_view(), name='update_route'),
    path('routes/<int:id>/delete/', RouteViews.RouteDeleteView.as_view(), name='delete_route'),
    path('routes/list/', RouteViews.RouteListView.as_view(), name='list_routes'),
    path('routes/<int:id>/detail/', RouteViews.RouteDetailView.as_view(), name='detail_route'),
    
    #Schedules
    path('operator/schedules/create/', ScheduleViews.ScheduleCreateView.as_view(), name='create_schedule'),
    path('operator/schedules/<int:id>/update/', ScheduleViews.ScheduleUpdateView.as_view(), name='update_schedule'),
    path('operator/schedules/<int:id>/delete/', ScheduleViews.ScheduleDeleteView.as_view(), name='delete_schedule'),
    path('operator/schedules/list/', ScheduleViews.OperatorSchedulesListView.as_view(), name='list_operators_schedule'),
    path('operator/schedules/<int:id>/details/', ScheduleViews.OperatorSchedulesDetailView.as_view(), name='detail_operator_schedule'),
    
    path('schedule/list/', ScheduleViews.ScheduleListView.as_view(), name='list_schedules'),
    path('schedule/<int:id>/details/', ScheduleViews.ScheduleDetailView.as_view(), name='detail_schedule'),
    
    #Seats
    path('schedules/<int:id>/seats/', ScheduleSeatsView.as_view(), name='schedule_seats'),
    
    #Booking Summary
    path('bookings/summary/', BookingViews.BookingSummaryView.as_view(), name='booking_summary'),
    
    #Pay with coins
    path('bookings/pay/', BookingViews.PayWithCoinsView.as_view(), name='pay_with_coins'),
    
    #Booking list & Detail
    path('bookings/list/', BookingViews.BookingsListView.as_view(), name='bookings_list'),
    path('bookings/detail/<int:id>/', BookingViews.BookinDetailview.as_view(), name='booking_detail'),
]