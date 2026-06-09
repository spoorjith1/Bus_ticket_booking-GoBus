from django.contrib import admin
from .models import Operator

@admin.register(Operator)
class OperatorAdmin(admin.ModelAdmin):
    list_display = ('op_name', 'op_user', 'op_email', 'op_mobile_no1')
    list_display_links = ('op_name', 'op_user')
    search_fields = ('op_name', 'op_user')