from django.contrib import admin

from .models import Data

# Register your models here.


class DataAdmin(admin.ModelAdmin):
    search_fields = ['FOD_ID',]

admin.site.register(Data, DataAdmin)