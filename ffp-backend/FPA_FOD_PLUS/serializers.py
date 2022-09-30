#from rest_framework_gis.serializers import GeoFeatureModelListSerializer, GeoFeatureModelSerializer
from rest_framework import serializers
from .models import Data

class HeatMapSerializer(serializers.ModelSerializer):

    class Meta:
        model = Data
        # TODO: figure out which fields need to be in the serializer... I would think all of them unfortunately
        # initially I'm putting the super neccesary ones
        fields = ('LATITUDE', 'LONGITUDE')

# TODO: something like https://stackoverflow.com/a/72902487/16610401

class VariableListSearializer(serializers.Serializer):

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
    
