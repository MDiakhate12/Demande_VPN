# Generated by Django 2.2.5 on 2019-09-11 11:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_demande_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='demande',
            name='status_demande',
        ),
    ]
