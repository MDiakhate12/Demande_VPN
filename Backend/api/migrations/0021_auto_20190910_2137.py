# Generated by Django 2.2.5 on 2019-09-10 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_auto_20190910_1535'),
    ]

    operations = [
        migrations.AlterField(
            model_name='demande',
            name='date_expiration',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
