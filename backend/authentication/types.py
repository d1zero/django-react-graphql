import graphene
from graphene_django import DjangoObjectType
from authentication.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'