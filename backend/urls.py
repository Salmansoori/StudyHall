from django.urls import path

from .views import (
    ClassRoomListView,
    ClassDetailView,
    ClassRoomCreateView,
    ClassSettingsUpdateView,
    ClassSettingsRetrieveView,
    ClassStudentJoinView,
    ClassStudentListView,
    ClassTeacherListView,
    ClassPostListView,
    ClassPostCreateView,
    ClassPostCommentListView,
    ClassPostCommentCreateView,
    ClassPostCommentRetrieveView,

)

urlpatterns = [
    path('', ClassRoomListView.as_view()),
    path('<pk>', ClassDetailView.as_view()),
    path('create/', ClassRoomCreateView.as_view()),
    path('<pk>/settings/retrieve/', ClassSettingsRetrieveView.as_view()),

    path('settings/', ClassSettingsUpdateView.as_view()),
    path('join/', ClassStudentJoinView.as_view()),
    path('students/', ClassStudentListView.as_view()),
    path('teachers/', ClassTeacherListView.as_view()),
    path('posts/', ClassPostListView.as_view()),
    path('createpost/', ClassPostCreateView.as_view()),
    path('postcomment/', ClassPostCommentListView.as_view()),
    path('createpostcomment/', ClassPostCommentCreateView.as_view()),
    path('postcomment/<pk>/', ClassPostCommentRetrieveView.as_view()),
]