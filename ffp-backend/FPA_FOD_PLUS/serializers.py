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
        
    def get_variableList():
       
        return self.data
    
