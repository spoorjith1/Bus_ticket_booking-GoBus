from django.contrib import admin
from .models import Schedule

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('bus', 'route', 'departure_time', 'arrival_time', 'journey_date', 'total_time', 'fare')
    list_display_links = ('bus', 'route', 'departure_time', 'arrival_time')
    search_fields = ('bus', 'route', 'journey_date', 'departure_time', 'arrival_time')
    list_filter = ('bus', 'route', 'journey_date', 'departure_time', 'arrival_time')
    ordering = ('-created_at')