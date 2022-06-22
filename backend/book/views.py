from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from book.models import Book

class CoverUploadView(APIView):
    def post(self, request, pk=None):
        book = Book.objects.get(pk=pk)
        book.file = request.FILES['file']
        book.cover = request.FILES['cover']
        book.save()
        return Response()
