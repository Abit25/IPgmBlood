from django.contrib import admin
from .models import Message, Hospital, User, UserProfile

# Register your models here.
admin.site.register(Hospital)
admin.site.register(Message)
admin.site.register(User)
admin.site.register(UserProfile)
