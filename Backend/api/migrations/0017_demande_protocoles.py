# Generated by Django 2.2.5 on 2019-09-09 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_remove_demande_protocoles'),
    ]

    operations = [
        migrations.AddField(
            model_name='demande',
            name='protocoles',
            field=models.CharField(blank=True, choices=[('http', 'HTTP'), ('https', 'HTPPS'), ('tcp', 'TCP'), ('ip', 'IP')], max_length=100, null=True),
        ),
    ]
