

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

choices = [('A+ve', 'A+ve'), ('A-ve', 'A-ve'), ('B+ve', 'B+ve'), ('B-ve', 'B-ve'),
           ('AB+ve', 'AB+ve'), ('AB-ve', 'AB-ve'), ('O-ve', 'O-ve'), ('O+ve', 'O+ve')]
# Create your models here.


class Hospital(models.Model):

    name = models.CharField(max_length=50)
    address = models.TextField()
    phone = models.IntegerField(blank=True, null=True)
    lat = models.FloatField()
    long = models.FloatField()

    def __str__(self):
        return self.name


class Message(models.Model):
    hospital = models.ForeignKey(
        Hospital, related_name='messages', on_delete=models.CASCADE)
    username = models.CharField(max_length=50)
    age = models.IntegerField()
    bloodgrp = models.CharField(choices=choices, max_length=50)
    address = models.CharField(max_length=150)
    symptoms = models.CharField(max_length=100)


class User(AbstractUser):
    type = models.CharField(
        choices=[('Hospital', 'Hospital'), ('User', 'User')], max_length=500, blank=True)


class UserProfile(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    dob = models.DateField()
    bloodgrp = models.CharField(max_length=10, choices=choices)
    address = models.CharField(max_length=100)
    phoneno = models.IntegerField()
    aadharno = models.IntegerField(unique=True)
    allergies = models.CharField(max_length=150)
    alchohol = models.BooleanField()
    diabetes = models.BooleanField()
