from django.views.decorators.csrf import csrf_exempt
from .models import ClassRoom, ClassSettings, ClassStudent, ClassPost, ClassPostComment, ClassTeacher
from .serializers import (
    ClassRoomSerializer,
    ClassRoomCreateSerializer,
    ClassSettingsSerializer,
    ClassStudentJoinSerializers,
    ClassStudentListSerializer,
    ClassPostListSerializer,
    ClassPostRetrieveSerializer,
    ClassPostCommentListSerializer, ClassTeacherListSerializer,
)
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
# Create your views here.
from rest_framework.permissions import IsAuthenticated



# class room create view
class ClassRoomCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ClassRoomCreateSerializer
    

    def perform_create(self, serializer):
        print(self.request.user)

        serializer.save(admin_id=self.request.user.pk)



# class room list view
class ClassRoomListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    serializer_class = ClassRoomSerializer

    def get_queryset(self):
        print(self.request.user)
        obj = ClassStudent.objects.filter(student_fk=self.request.user)
        userClassList = []
        for _ in range(len(obj)):
            userClassList.append(obj[_].class_fk)
        obj = ClassTeacher.objects.filter(teacher_fk=self.request.user)
        for _ in range(len(obj)):
            userClassList.append(obj[_].class_fk)
        return userClassList


# class details view
class ClassDetailView(RetrieveAPIView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer


# class settings retrieve view
class ClassSettingsRetrieveView(RetrieveAPIView):
    queryset = ClassSettings.objects.all()
    serializer_class = ClassSettingsSerializer


#class setting update view
class ClassSettingsUpdateView(CreateAPIView):
    queryset = ClassSettings.objects.all()
    serializer_class = ClassSettingsSerializer

    def perform_create(self, serializer):
        serializer.save(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']))


# Student joining class view
class ClassStudentJoinView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ClassStudentJoinSerializers
    
    def perform_create(self, serializer):
        print(self.request.data['class_code'])
        print(self.request.user)
        #if ClassTeacher.objects.filter(teacher_fk=self.request.user):
        #    raise ValidationError("You are teacher of this Class")
        serializer.save(class_fk=ClassRoom.objects.get(class_code=self.request.data['class_code']),
                        student_fk=self.request.user)

# class Students List view
class ClassStudentListView(ListAPIView):
    serializer_class = ClassStudentListSerializer

    def get_queryset(self):
        return ClassStudent.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']))


# class teachers list view
class ClassTeacherListView(ListAPIView):
    serializer_class = ClassTeacherListSerializer

    def get_queryset(self):
        return ClassTeacher.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']))

# class posts view
class ClassPostListView(ListAPIView):
    serializer_class = ClassPostRetrieveSerializer

    def get_queryset(self):
        return ClassPost.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']))


# create post in class view
class ClassPostCreateView(CreateAPIView):
    serializer_class = ClassPostListSerializer

    def perform_create(self, serializer):
        serializer.save(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']),
                        post_creator=User.objects.get(pk=self.request.user.pk))


# post comment on class view
class ClassPostCommentListView(ListAPIView):
    serializer_class = ClassPostCommentListSerializer

    def get_queryset(self):
        return ClassPostComment.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']),
                                               post_fk=ClassPost.objects.get(pk=self.request.GET['post_id']), )


class ClassPostCommentCreateView(CreateAPIView):
    serializer_class = ClassPostCommentListSerializer

    def perform_create(self, serializer):
        class_fk = ClassRoom.objects.get(pk=self.request.GET['class_id'])
        commenter = User.objects.get(pk=self.request.user.pk)
        post_fk = ClassPost.objects.get(pk=self.request.GET['post_id'])
        #if not ClassStudent.objects.filter(class_fk=class_fk, student_fk=commenter) or not ClassTeacher.objects.filter(
        #        class_fk=class_fk, teacher_fk=commenter):
        #    raise ValidationError("You are not a member of this Class")
        serializer.save(class_fk=class_fk,
                        post_fk=post_fk,
                        commenter=commenter)


class ClassPostCommentRetrieveView(RetrieveAPIView):
    serializer_class = ClassPostCommentListSerializer

    def get_queryset(self):
        return ClassPostComment.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET.get['class_id']),
                                               post_fk=ClassPost.objects.get(pk=self.request.GET.get['post_id']), )
