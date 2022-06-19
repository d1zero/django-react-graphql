from django.db import models
from django.contrib.auth.models import AbstractUser
from book.models import Book


class User(AbstractUser):
    email = models.EmailField(verbose_name='Email', max_length=254)

    def __str__(self):
        return self.email


    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class FavoriteBook(models.Model):
    user = models.ForeignKey(User, verbose_name='User', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, verbose_name='Book', on_delete=models.CASCADE)
