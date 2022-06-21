import graphene
from book.schema import Query as BookQuery, Mutation as BookMutation
from authentication.schema import Query as AuthenticationQuery, Mutation as AuthenticationMutation


class Query(BookQuery, AuthenticationQuery, graphene.ObjectType):
    pass

class Mutation(BookMutation, AuthenticationMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
