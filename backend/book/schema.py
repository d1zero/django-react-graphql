import graphene
from book.types import BookType
from book.models import Book
from book.mutation import CreateBookMutation, DeleteBookMutation, UpdateBookMutation


class Query(graphene.ObjectType):
    all_books = graphene.List(BookType)
    book_by_id = graphene.Field(BookType, id=graphene.ID(required=True))

    def resolve_all_books(root, info):
        return Book.objects.all()

    def resolve_book_by_id(root, info, id):
        try:
            return Book.objects.get(id=id)
        except Book.DoesNotExist:
            return None


class Mutation(graphene.ObjectType):
    create_book = CreateBookMutation.Field()
    delete_book = DeleteBookMutation.Field()
    update_book = UpdateBookMutation.Field()