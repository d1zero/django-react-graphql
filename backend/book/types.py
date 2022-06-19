import graphene
from graphene_django import DjangoObjectType
from book.models import Book, Author


class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = '__all__'


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = '__all__'
