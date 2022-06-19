import graphene
from book.schema import Query as BookQuery, Mutation as BookMutation


class Query(BookQuery, graphene.ObjectType):
    pass

class Mutation(BookMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
