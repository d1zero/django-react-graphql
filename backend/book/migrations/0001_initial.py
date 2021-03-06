# Generated by Django 4.0.5 on 2022-06-18 08:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(max_length=255, verbose_name='Nickname')),
                ('date_of_birth', models.DateField(verbose_name='Date of birth')),
                ('bio', models.TextField(verbose_name='About')),
                ('photo', models.ImageField(blank=True, upload_to='authors/', verbose_name='Photo')),
            ],
            options={
                'verbose_name': 'Author',
                'verbose_name_plural': 'Authors',
            },
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='')),
                ('date_of_release', models.DateField(verbose_name='Date of release')),
                ('cover', models.ImageField(upload_to='books/covers', verbose_name='Cover')),
                ('file', models.FileField(upload_to='books/files', verbose_name='File')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='book.author', verbose_name='Author')),
            ],
            options={
                'verbose_name': 'Book',
                'verbose_name_plural': 'Books',
            },
        ),
    ]
