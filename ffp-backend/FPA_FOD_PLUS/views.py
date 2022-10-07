from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from django.db.models import Q


from .models import Data

all_fields = ['LATITUDE', 'LONGITUDE', 'FIRE_YEAR', 'DISCOVERY_DATE', 'DISCOVERY_DOY', 'DISCOVERY_TIME', 'CONT_DATE', 'CONT_DOY', 'CONT_TIME', 'STATE', 'COUNTY',
                'Ecoregion_US_L4CODE', 'Ecoregion_US_L3CODE', 'Ecoregion_NA_L3CODE', 'Ecoregion_NA_L2CODE', 'Ecoregion_NA_L1CODE']

def index(request):
    
    return HttpResponse("Hello, world. You're at the FPA-FOD-Plus index page.")
    
@api_view(['GET'])
def heat_map(request):
    if request.method == 'GET':
        # limit to august fires 
        data = Data.objects.filter(
            FIRE_YEAR=2018,
            # DISCOVERY_DOY__lte=243,
            # DISCOVERY_DOY__gte=100,
            FIRE_SIZE__gte=1,
        # Filter out any broken latitude / longitude fields
        ).exclude(
            LATITUDE=0
        ).exclude(
            LONGITUDE=0
        ).values('LATITUDE', 'LONGITUDE', 'FIRE_SIZE')

        serializer = HeatMapSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = StudentSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(status=status.HTTP_201_CREATED)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def perform_search(request):
    
    if request.method == 'GET':
        # limit to august fires
        queryset = Data.objects.all()

        requested_fields = []
        for f in all_fields:
            value = request.query_params.get(f,None)
            if value:
                # if we have a value for field as param
                # add column to filtering
                # todo handle the .filter based on the actual value of the param

                # todo only last ran .values() is working 
                requested_fields.append(f);
                # if f == 'FIRE_YEAR':
                #     queryset=queryset.filter(f'{f}={value}')

                # if f == 'STATE':
                #     queryset=queryset.filter(f'{f}={value}')                

                # queryset=queryset.filter(f'{f}={value}')
        queryset=queryset.values(", ". join(f'\'{requested_fields}\''))

        serializer = searchSerializer(queryset, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET'])
def variable_list(request):
    if request.method == 'GET':
        serializer = VariableListSerializer()
        return Response(serializer.data)
  
@api_view(['GET'])
def distinct_years_list(request):
    if request.method == 'GET':
        serializer = DistinctYearsSerializer()
        return Response(serializer.data)

@api_view(['GET'])
def distinct_states_list(request):
    if request.method == 'GET':
        serializer = DistinctStateSerializer()
        return Response(serializer.data)

def results(request):
    query_results = Data.objects.filter(NWCG_REPORTING_UNIT_ID='USCACDF')
    response = ""
    for row in query_results:
        response += "FOD_ID: " + str(row.FOD_ID)
        response += " FPA_ID: " + str(row.FPA_ID)
        response += " NAME: " + str(row.NAME) + "\n"
    
    return HttpResponse(response)
    
def administrator(request):
    return HttpResponse("Hello you are looking at the administrator page.")