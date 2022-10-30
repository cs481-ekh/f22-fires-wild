#from rest_framework_gis.serializers import GeoFeatureModelListSerializer, GeoFeatureModelSerializer
from rest_framework import serializers
from .models import Data

class HeatMapSerializer(serializers.ModelSerializer):

    class Meta:
        model = Data
        fields = ('LATITUDE', 'LONGITUDE', 'FIRE_SIZE')


class searchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['LATITUDE', 'LONGITUDE','FIRE_SIZE', 'FIRE_YEAR', 'DISCOVERY_DATE', 'DISCOVERY_DOY', 'DISCOVERY_TIME',
                  'CONT_DATE', 'CONT_DOY', 'CONT_TIME', 'STATE', 'COUNTY','Ecoregion_US_L4CODE', 'Ecoregion_US_L3CODE',
                  'Ecoregion_NA_L3CODE', 'Ecoregion_NA_L2CODE', 'Ecoregion_NA_L1CODE']

class fireByIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'


# TODO: something like https://stackoverflow.com/a/72902487/16610401

class VariableListSerializer(serializers.Serializer):

    variableList = serializers.SerializerMethodField()
    
    data = serializers.DictField(
        child=serializers.CharField()
    )
    data = { 
        'FIRE_YEAR' : 'Calendar year in which the fire was discovered or confirmed to exist',
        'DISCOVERY_DATE' : 'Date on which the fire was discovered or confirmed to exist',
        'DISCOVERY_DOY' : 'Day of year on which the fire was discovered or confirmed to exist',
        'DISCOVERY_TIME' : 'Time of day that the fire was discovered or confirmed to exist',
        'CONT_DATE' : 'Date on which the fire was declared contained or otherwise controlled (mm/dd/yyyy where mm=month, dd=day, and yyyy=year)',
        'CONT_DOY' : 'Day of year on which the fire was declared contained or otherwise controlled',
        'CONT_TIME' : 'Time of day that the fire was declared contained or otherwise controlled (hhmm where hh=hour, mm=minutes)',
        'STATE' : 'Two-letter alphabetic code for the state in which the fire burned (or originated), based on the nominal designation in the fire report',
        'COUNTY' : 'County, or equivalent, in which the fire burned (or originated), based on nominal designation in the fire report',
        'Ecoregion_US_L4CODE' : 'Ecoregion level 4 code in the US',
        'Ecoregion_US_L3CODE' : 'Ecoregion level 3 code in the US',
        'Ecoregion_NA_L3CODE' : 'Ecoregion level 3 code in the North America',
        'Ecoregion_NA_L2CODE' : 'Ecoregion level 2 code in the North America',
        'Ecoregion_NA_L1CODE' : 'Ecoregion level 1 code in the North America',
    }
        
    def get_variableList():
       
        return self.data
    
class DistinctYearsSerializer(serializers.Serializer):

    distinctYearsList = serializers.SerializerMethodField()
    
    fireYears = []
    
    data = serializers.ListField(
        child = serializers.IntegerField()
    ) 
    
    fetched_fire_years = Data.objects.values('FIRE_YEAR').distinct()
    
    for row in fetched_fire_years:
        fireYears.append(str(row['FIRE_YEAR']))
    
    data = fireYears
    
    def get_variableList():
       
        return self.data

class DistinctStateSerializer(serializers.Serializer):

    distinctStatesList = serializers.SerializerMethodField()
    
    states = []
    
    data = serializers.ListField(
        child = serializers.CharField()
    ) 
    
    fetched_states = Data.objects.values('STATE').distinct()
    
    for row in fetched_states:
        states.append(str(row['STATE']))
    
    data = states
    
    def get_variableList():
       
        return self.data
        
class DistinctCountySerializer(serializers.Serializer):

    class Meta:
        model = Data
        fields = ('COUNTY')
        
