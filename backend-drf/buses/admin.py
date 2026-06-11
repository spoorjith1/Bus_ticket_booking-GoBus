from django.contrib import admin
from .models import Bus

@admin.register(Bus)
class BusAdmin(admin.ModelAdmin):
    list_display = ('operator', 'bus_number', 'bus_name', 'bus_type', 'total_seats')
    list_display_links = ('operator', 'bus_number', 'bus_name')
    list_filter = ('operator')
    search_fields = ('operator', 'bus_number', 'bus_name')
    ordering = ('-created_at',)