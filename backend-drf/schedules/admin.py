from django.contrib import admin
from .models import Schedule

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('bus', 'route', 'departure_datetime', 'arrival_datetime', 'fare')
    list_display_links = ('bus', 'route', 'departure_datetime', 'arrival_datetime')
    search_fields = ('bus', 'route', 'departure_datetime', 'arrival_datetime')
    list_filter = ('bus', 'route', 'departure_datetime', 'arrival_datetime')
    ordering = ('-created_at',)