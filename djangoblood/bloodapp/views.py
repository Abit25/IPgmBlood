from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .serializers import MessageSerializer
from .models import User, Hospital, Message
import json
from django.core import serializers
# Create your views here.


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body['username']
        password = body['password']
        print('User ', username, "Password ", password)
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return JsonResponse({'username': user.username, 'status': 200, 'type': user.type})
        else:
            return JsonResponse({'status': 400})


@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body['username']
        password = body['password']

        email = body['email']
        type = body['type']

        try:
            user_check = User.objects.get(username=username)
            if(user_check):
                return JsonResponse({'status': 400, 'errmsg': 'User already exists !'})
        except User.DoesNotExist:
            user = User.objects.create_user(
                username=username, password=password, email=email, type=type)
            return JsonResponse({'status': 200})


@csrf_exempt
def message_view(request):
    if(request.method == "GET"):
        messages = Message.objects.all()
        serializers = MessageSerializer(messages, many=True)
        return JsonResponse(serializers.data, safe=False)

    if(request.method == "POST"):

        # username = request.POST.hospital

        hospital = request.POST['hospital']

        hospital = Hospital.objects.get(name__contains=str(hospital.title()))
        print(hospital)
        messages = Message.objects.filter(hospital=hospital)
        messages = MessageSerializer(messages, many=True)
        return JsonResponse({"status": 200, "messages": messages.data})


@csrf_exempt
def message_send(request):
    if(request.method == "POST"):
        hospitalsel = request.POST['selHospital']

        print(hospitalsel)
        try:
            new_hosp = Hospital.objects.get(name=hospitalsel)
        except Hospital.DoesNotExist:

            new_hosp = Hospital.objects.create(name=hospitalsel)
        print(new_hosp)
        name = request.POST["fname"]+" "+request.POST["lname"]
        new_message = Message.objects.create(
            hospital=new_hosp, username=name, age=request.POST["age"], bloodgrp="B+ve", symptoms=request.POST["symptoms"], address=request.POST["address"])
        return JsonResponse({"status": 200})
