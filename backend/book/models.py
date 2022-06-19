from django.db import models


class Book(models.Model):
    title = models.CharField(verbose_name='Title', max_length=255)
    author = models.ForeignKey("Author", verbose_name='Author', on_delete=models.CASCADE)
    date_of_release = models.DateField(verbose_name='Date of release')
    cover = models.ImageField(verbose_name='Cover', upload_to='books/covers')
    file = models.FileField(verbose_name='File', upload_to='books/files')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'

class Author(models.Model):
    nickname = models.CharField(verbose_name='Nickname', max_length=255)
    date_of_birth = models.DateField(verbose_name='Date of birth')
    bio = models.TextField(verbose_name='About')
    photo = models.ImageField(verbose_name='Photo', upload_to='authors/', blank=True)

    def __str__(self):
        return self.nickname

    class Meta:
        verbose_name = 'Author'
        verbose_name_plural = 'Authors'
