from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts import views as AccViews
from operators import views as OperatorViews
from buses import views as BusViews
from routes import views as RouteViews
from schedules import views as ScheduleViews
from seats.views import ScheduleSeatsView
from bookings import views as BookingViews
from reviews import views as ReviewViews


urlpatterns = [
    #Register
    path('register/', AccViews.UserRegisterView.as_view(), name='user_registration'),
   
    #Login
    path('token/', TokenObtainPairView.as_view(), name='access_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    
    #User Profile View & Edit
    path('profile/me/', AccViews.OwnProfileView.as_view(), name='user_profile'), #user ✅
    path('profile/me/edit/', AccViews.OwnProfileEditView.as_view(), name='user_profile_edit'),
    path('profile/me/delete', AccViews.OwnProfileDeleteView.as_view(), name='user_profile_delete'),
    #Add to Wallet
    path('wallet/add/coins/', AccViews.AddCoinsView.as_view(), name='add_coins'),
    
    #Operator
    path('operator/create/', OperatorViews.OperatorCreateView.as_view(), name='create_operator'), #admin
    path('operator/me/update/', OperatorViews.OperatorUpdateView.as_view(), name='update_operator'), #op
    path('operator/me/profile/', OperatorViews.OperatorProfileView.as_view(), name='view_operator'), #op
    path('operator/<int:id>/delete/', OperatorViews.OperatorDeleteView.as_view(), name='delete_operator'), #admin
    path('operator/list/', OperatorViews.OperatorListView.as_view(), name='operator_list'), #admin
    
    #Buses
    path('operator/buses/create/', BusViews.BusCreateView.as_view(), name='create_bus'), #op
    path('operator/buses/<int:id>/update/', BusViews.BusUpdateView.as_view(), name='update_bus'), #op
    path('operator/buses/<int:id>/delete/', BusViews.BusDeleteView.as_view(), name='delete_bus'), #op
    path('operator/buses/list/', BusViews.BusListView.as_view(), name='bus_list'), #op
    path('operator/buses/<int:id>/detail/', BusViews.BusDetailView.as_view(), name='bus_detail'), #op
    
    #Routes
    path('routes/create/', RouteViews.RouteCreateView.as_view(), name='create_route'), #admin
    path('routes/<int:id>/update/', RouteViews.RouteUpdateView.as_view(), name='update_route'), #admin
    path('routes/<int:id>/delete/', RouteViews.RouteDeleteView.as_view(), name='delete_route'), #admin
    path('routes/list/', RouteViews.RouteListView.as_view(), name='list_routes'), #op and admin
    path('routes/<int:id>/detail/', RouteViews.RouteDetailView.as_view(), name='detail_route'), #op and admin
    
    #Schedules
    path('operator/schedules/create/', ScheduleViews.ScheduleCreateView.as_view(), name='create_schedule'), #op
    path('operator/schedules/<int:id>/update/', ScheduleViews.ScheduleUpdateView.as_view(), name='update_schedule'), #op
    path('operator/schedules/<int:id>/delete/', ScheduleViews.ScheduleDeleteView.as_view(), name='delete_schedule'), #op
    path('operator/schedules/list/', ScheduleViews.OperatorSchedulesListView.as_view(), name='list_operators_schedule'), #op
    path('operator/schedules/<int:id>/details/', ScheduleViews.OperatorSchedulesDetailView.as_view(), name='detail_operator_schedule'), #op
    #Open Schedules for all
    path('schedule/list/', ScheduleViews.ScheduleListView.as_view(), name='list_schedules'), #all
    path('schedule/<int:id>/details/', ScheduleViews.ScheduleDetailView.as_view(), name='detail_schedule'), #all
    #Search Schedules
    path('schedules/search/', ScheduleViews.ScheduleSearchView.as_view(), name='search_schedules'), #all
    
    #Seats
    path('schedules/<int:id>/seats/', ScheduleSeatsView.as_view(), name='schedule_seats'), #user
    
    #Booking Summary
    path('bookings/summary/', BookingViews.BookingSummaryView.as_view(), name='booking_summary'), #user
    #Pay with coins
    path('bookings/pay/', BookingViews.PayWithCoinsView.as_view(), name='pay_with_coins'), #user
    #Booking list & Detail
    path('bookings/my/list/', BookingViews.BookingsListView.as_view(), name='bookings_list'), #user ✅
    path('bookings/detail/<int:id>/', BookingViews.BookinDetailview.as_view(), name='booking_detail'), #user
    
    #Reviews
    path('bus/<int:bus_id>/review/create/', ReviewViews.ReviewCreateView.as_view(), name='create_review'), #user
    path('bus/<int:pk>/review/update/', ReviewViews.ReviewUpdateView.as_view(), name='update_review'), #user
    path('bus/<int:pk>/review/delete/', ReviewViews.ReviewDeleteView.as_view(), name='delete_review'), #user
    #List of reviews for each bus
    path('bus/<int:bus_id>/reviews/', ReviewViews.BusReviewsView.as_view(), name='bus_reviews'), #all
]