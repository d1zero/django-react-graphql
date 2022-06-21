import graphene
from graphql import GraphQLError
from book.models import Author, Book
from book.types import BookType
from graphql_jwt.decorators import login_required


class CreateBookMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        author_id = graphene.ID(required=True)
        date_of_release = graphene.Date(required=True)

    book = graphene.Field(BookType)

    @classmethod
    @login_required
    def mutate(cls, root, info, title, author_id, date_of_release):
        author = Author.objects.get(id=author_id)
        book = Book(title=title, author=author,
                    date_of_release=date_of_release)
        book.save()
        return CreateBookMutation(book=book)


class UpdateBookMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        author_id = graphene.ID()
        date_of_release = graphene.Date()

    book = graphene.Field(BookType)

    @classmethod
    def mutate(cls, root, info, id, title, author_id, date_of_release):
        try:
            book = Book.objects.get(id=id)
            book.title = title
            try:
                author = Author.objects.get(id=author_id)
                book.author = author
            except Author.DoesNotExist:
                return GraphQLError(message="Author with this id does not exist")
            book.date_of_release = date_of_release
            book.save()

            return UpdateBookMutation(book=book)
        except Book.DoesNotExist:
            return GraphQLError(message="Book with this id does not exist")


class DeleteBookMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    book = graphene.Field(BookType)

    @classmethod
    def mutate(cls, root, info, id):
        try:
            book = Book.objects.get(id=id)
            book.delete()
            return DeleteBookMutation(book=book)
        except Book.DoesNotExist:
            return GraphQLError(message="Book with this id does not exist")
