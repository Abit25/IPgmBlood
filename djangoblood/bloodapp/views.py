from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .serializers import MessageSerializer
from .models import User, Hospital, Message, UserProfile
import json
from django.core import serializers
# Create your views here.


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = str(body['username'])
        password = str(body['password'])
        print('User =', username, "Password =", password)
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
        username = str(body['username'])
        password = str(body['password'])

        email = body['email']
        type = body['type']

        try:
            user_check = User.objects.get(username=username)
            print(user_check)
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
        try:
            chk_user = User.objects.get(
                first_name=request.POST["fname"], last_name=request.POST["lname"])
            print(chk_user)
            new_message = Message.objects.create(
                hospital=new_hosp, username=name, age=request.POST["age"], bloodgrp="B+ve", symptoms=request.POST["symptoms"], address=request.POST["address"], is_registered=1)
        except Hospital.DoesNotExist:
            new_message = Message.objects.create(
                hospital=new_hosp, username=name, age=request.POST["age"], bloodgrp="B+ve", symptoms=request.POST["symptoms"], address=request.POST["address"], is_registered=0)

        # new_message = Message.objects.create(
        #     hospital=new_hosp, username=name, age=request.POST["age"], bloodgrp="B+ve", symptoms=request.POST["symptoms"], address=request.POST["address"])
        return JsonResponse({"status": 200})


@csrf_exempt
def patient_data(request):
    fname = request.POST["fname"]
    lname = request.POST["lname"]
    add = request.POST["add"]
    dob = request.POST["dob"]
    pno = request.POST["pno"]
    aadhar = request.POST["aadhar"]
    eno = request.POST["eno"]
    gender = request.POST["gender"]
    bloodgrp = request.POST["bloodgrp"]
    phyname = request.POST["phyname"]
    phyno = request.POST["phyno"]
    iname = request.POST["iname"]
    polno = request.POST["polno"]
    insdet = request.POST["insdet"]
    alchohol = int(request.POST["alchohol"])
    cig = int(request.POST["cig"])
    diab = int(request.POST["diab"])
    allergies = request.POST["allergies"]
    imm = int(request.POST["imm"])
    injuries = request.POST["injuries"]
    medinfo = request.POST["medinfo"]
    regmed = request.POST["regmed"]
    my_user = User.objects.get(username=fname+lname)
    print("User is : ", my_user)
    user_prof = UserProfile.objects.get_or_create(
        user_id=my_user, name=fname+" "+lname, address=add, dob=dob, phoneno=pno, aadharno=aadhar, eno=eno, gender=gender, bloodgrp=bloodgrp, phyname=phyname, phyno=phyno, iname=iname, polno=polno, insdet=insdet, allergies=allergies, alchohol=alchohol, cig=cig, diabetes=diab, imm=imm, regmed=regmed, medinfo=medinfo, injuries=injuries)
    print(user_prof)
    return JsonResponse({"status": 200})
