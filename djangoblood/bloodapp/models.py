

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
    is_registered = models.BooleanField(default=0)


class User(AbstractUser):
    type = models.CharField(
        choices=[('Hospital', 'Hospital'), ('User', 'User')], max_length=500, blank=True)

    def __str__(self):
        return "Username: "+str(self.username)+" Email ID: "+str(self.email)


class UserProfile(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    dob = models.DateField()
    add = models.CharField(max_length=100)
    eno = models.CharField(max_length=10)
    gender = models.CharField(max_length=200)
    phyname = models.CharField(max_length=200)
    phyno = models.CharField(max_length=10)
    iname = models.CharField(max_length=200, blank=True)
    polno = models.CharField(blank=True, max_length=25)
    insdet = models.CharField(max_length=200, blank=True)
    bloodgrp = models.CharField(max_length=10, choices=choices)
    address = models.CharField(max_length=100)
    phoneno = models.CharField(max_length=10)
    aadharno = models.CharField(unique=True, max_length=10)
    allergies = models.CharField(max_length=150, default="", blank=True)
    alchohol = models.IntegerField(default=0, max_length=1)
    diabetes = models.IntegerField(default=0, max_length=1)
    cig = models.IntegerField(default=0, max_length=1)
    imm = models.IntegerField(default=1, max_length=1)
    regmed = models.CharField(max_length=200, default="", blank=True)
    medinfo = models.CharField(max_length=200, default="", blank=True)
    injuries = models.CharField(max_length=200, default="", blank=True)

    def __str__(self):
        return self.name
