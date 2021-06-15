from rest_framework import serializers

from .models import ClassRoom, ClassSettings, ClassStudent, ClassPost, ClassPostComment, ClassTeacher


class ClassRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = [
            'id',
            'class_name',
            'section',
            'subject',
            'class_code',
        ]


class ClassRoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = [
            'class_name',
            'section',
            'subject',
            'room',
        ]

class ClassStudentJoinSerializers(serializers.ModelSerializer):
    class_code = serializers.SerializerMethodField()

    class Meta:
        model = ClassStudent
        fields = ['class_code',]

    def get_class_code(self, *args):
        return "Joining Successful"

class ClassSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassSettings
        fields = [
            'is_invite_active',
            'student_can_post',
            'student_can_comment',
            'show_deleted_items',
        ]

class ClassStudentListSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField()

    class Meta:
        model = ClassStudent
        fields = ['username']


class ClassTeacherListSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField()

    class Meta:
        model = ClassTeacher
        fields = ['username']


class ClassPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassPost
        fields = [
            'post_title',
            'post_description',
            'post_attachment_url',
        ]


class ClassPostRetrieveSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField()

    class Meta:
        model = ClassPost
        fields = ['id', 'post_title', 'post_description', 'post_attachment_url', 'username', 'updated']


class ClassPostCommentListSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField()

    class Meta:
        model = ClassPostComment
        fields = ['post_comment', 'username', 'updated']