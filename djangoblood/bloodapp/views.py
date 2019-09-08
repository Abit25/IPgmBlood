from django.shortcuts import render
from django.contrib.auth import authenticate,login,logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import User
import json
# Create your views here.

@csrf_exempt
def login_view(request):
    if request.method=='POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username=body['username']
        password=body['password']
        print('User ',username,"Password ",password)
        user=authenticate(username=username,password=password)

        if user is not None:
            login(request,user)
            return JsonResponse({'username':user.username,'status':200})
        else:
            return JsonResponse({'status':400})

@csrf_exempt
def signup_view(request):
    if request.method=='POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username=body['username']
        password=body['password']

        email=body['email']
        type=body['type']

        try:
            user_check=User.objects.get(username=username)
            if(user_check):
                return JsonResponse({'status':400,'errmsg':'User already exists !'})
        except User.DoesNotExist:
            user = User.objects.create_user(username=username,password=password,email=email,type=type)
            return JsonResponse({'status':200})
