#from rest_framework_gis.serializers import GeoFeatureModelListSerializer, GeoFeatureModelSerializer
from rest_framework import serializers
from .models import Data

class HeatMapSerializer(serializers.ModelSerializer):

    class Meta:
        model = Data
        fields = ('LATITUDE', 'LONGITUDE', 'FIRE_SIZE')

# TODO: something like https://stackoverflow.com/a/72902487/16610401

class VariableListSerializer(serializers.Serializer):

    variableList = serializers.SerializerMethodField()
    
    data = serializers.DictField(
        child=serializers.CharField()
    )
    data = { 
        'FIRE_YEAR' : 'Description',
        'DISCOVERY_DATE' : 'Description',
        'DISCOVERY_DOY' : 'Description',
        'DISCOVERY_TIME' : 'Description',
        'CONT_DATE' : 'Description',
        'CONT_DOY' : 'Description',
        'CONT_TIME' : 'Description',
        'STATE' : 'Description',
        'COUNTY' : 'Description',
        'Ecoregion_US_L4CODE' : 'Description',
        'Ecoregion_US_L3CODE' : 'Description',
        'Ecoregion_NA_L3CODE' : 'Description',
        'Ecoregion_NA_L2CODE' : 'Description',
        'Ecoregion_NA_L1CODE' : 'Description',
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
    
    #distinctCountyList = serializers.SerializerMethodField()
    
    #counties = []
    
    #data = serializers.ListField(
    #    child = serializers.CharField()
    #) 
    
    #fetched_counties = Data.objects.values('COUNTY').distinct()
    
    #for row in fetched_counties:
    #    counties.append(str(row['COUNTY']))
    #
    #data = counties
    
    #def get_variableList():
       
    #    return self.data
       
    #class Meta:
        #model = Data
        
        #fields = [
            #'FIRE_YEAR', 
            #'DISCOVERY_DATE',
            #'DISCOVERY_DOY',
            #'DISCOVERY_TIME',
            #'CONT_DATE',
            #'CONT_DOY',
            #'CONT_DATE',
            #'CONT_DOY',
            #'CONT_TIME',
            #'STATE',
            #'COUNTY',
            #'Ecoregion_US_L4CODE',
            #'Ecoregion_US_L3CODE',
            #'Ecoregion_NA_L3CODE',
            #'Ecoregion_NA_L2CODE',
            #'Ecoregion_NA_L1CODE'
        #]