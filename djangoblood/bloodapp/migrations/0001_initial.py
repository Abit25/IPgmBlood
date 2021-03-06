# Generated by Django 2.2.6 on 2019-10-31 17:44

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('type', models.CharField(blank=True, choices=[('Hospital', 'Hospital'), ('User', 'User')], max_length=500)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('address', models.TextField()),
                ('phone', models.IntegerField(blank=True, null=True)),
                ('lat', models.FloatField()),
                ('long', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('dob', models.DateField()),
                ('add', models.CharField(max_length=100)),
                ('pno', models.IntegerField()),
                ('eno', models.IntegerField()),
                ('gender', models.CharField(max_length=200)),
                ('phyname', models.CharField(max_length=200)),
                ('phyno', models.IntegerField()),
                ('iname', models.CharField(max_length=200)),
                ('polno', models.IntegerField()),
                ('insdet', models.CharField(max_length=200)),
                ('bloodgrp', models.CharField(choices=[('A+ve', 'A+ve'), ('A-ve', 'A-ve'), ('B+ve', 'B+ve'), ('B-ve', 'B-ve'), ('AB+ve', 'AB+ve'), ('AB-ve', 'AB-ve'), ('O-ve', 'O-ve'), ('O+ve', 'O+ve')], max_length=10)),
                ('address', models.CharField(max_length=100)),
                ('phoneno', models.IntegerField()),
                ('aadharno', models.IntegerField(unique=True)),
                ('allergies', models.CharField(max_length=150)),
                ('alchohol', models.BooleanField()),
                ('diabetes', models.BooleanField()),
                ('cig', models.BooleanField()),
                ('imm', models.BooleanField()),
                ('regmed', models.CharField(max_length=200)),
                ('medinfo', models.CharField(max_length=200)),
                ('injuries', models.CharField(max_length=200)),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('age', models.IntegerField()),
                ('bloodgrp', models.CharField(choices=[('A+ve', 'A+ve'), ('A-ve', 'A-ve'), ('B+ve', 'B+ve'), ('B-ve', 'B-ve'), ('AB+ve', 'AB+ve'), ('AB-ve', 'AB-ve'), ('O-ve', 'O-ve'), ('O+ve', 'O+ve')], max_length=50)),
                ('address', models.CharField(max_length=150)),
                ('symptoms', models.CharField(max_length=100)),
                ('is_registered', models.BooleanField(default=0)),
                ('hospital', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='bloodapp.Hospital')),
            ],
        ),
    ]
