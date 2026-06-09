from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'created_at', 'role')
    list_display_links = ('id', 'username', 'email')
    list_filter = ('role',)
    search_fields = ('username', 'email', 'role')
    ordering = ('-created_at',)