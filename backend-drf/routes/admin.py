from django.contrib import admin
from .models import Route

@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ('id', 'source', 'destination', 'distance')
    list_display_links = ('id', 'source', 'destination', 'distance')
    search_fields = ('source', 'destination', 'distance')
    list_filter = ('source', 'destination')
    ordering = ('-created_at',)