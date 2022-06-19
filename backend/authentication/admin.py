from django.contrib import admin
from authentication.models import User, FavoriteBook
from django.contrib.auth.models import Group


admin.site.register(User)
admin.site.register(FavoriteBook)

admin.site.unregister(Group)
