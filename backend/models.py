import string
from django.contrib.auth.models import User
from django.db import models
from django.utils.crypto import get_random_string


# models

class TimeStampBase(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ClassRoom(TimeStampBase):
    class_name = models.CharField(max_length=50)
    section = models.CharField(max_length=20)
    subject = models.CharField(max_length=50)
    room = models.CharField(max_length=50)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    class_code = models.CharField(max_length=15, unique=True, blank=True)

    def save(self, *args, **kwrgs):
        self.class_code = get_random_string(5, allowed_chars=string.ascii_uppercase + string.digits)
        super(ClassRoom, self).save(*args, **kwrgs)
        ClassSettings(class_fk=self).save()
        ClassTeacher(class_fk=self, teacher_fk=self.admin).save()

    def isTeacher(self, pk):
        if self.admin == pk:
            return True
        else:
            return False

    def __str__(self):
        return self.class_name


class ClassSettings(TimeStampBase):
    class_fk = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    is_invite_active = models.BooleanField(default=True)
    student_can_post = models.BooleanField(default=True)
    student_can_comment = models.BooleanField(default=True)
    show_deleted_items = models.BooleanField(default=False)

    def __str__(self):
        return "Settings For " + self.class_fk.class_name


class ClassTeacher(TimeStampBase):
    class_fk = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    teacher_fk = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = [['class_fk', 'teacher_fk']]

    @property
    def username(self):
        return self.teacher_fk.username

    def __str__(self):
        return self.teacher_fk.first_name + " in " + self.class_fk.class_name


class ClassStudent(TimeStampBase):
    class_fk = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    student_fk = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = [['class_fk', 'student_fk']]

    @property
    def username(self):
        return self.student_fk.username

    def __str__(self):
        return self.student_fk.first_name + " in " + self.class_fk.class_name


class ClassPost(TimeStampBase):
    class_fk = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    post_creator = models.ForeignKey(User, on_delete=models.CASCADE)
    post_title = models.CharField(max_length=60)
    post_description = models.TextField()
    post_attachment_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.post_title

    @property
    def username(self):
        return self.post_creator.username

    class Meta:
        ordering = ['-updated']


class ClassPostComment(TimeStampBase):
    class_fk = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    post_fk = models.ForeignKey(ClassPost, on_delete=models.CASCADE)
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    post_comment = models.TextField()

    @property
    def username(self):
        return self.commenter.username

    def __str__(self):
        return self.post_comment[:20]
