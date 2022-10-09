from dataclasses import field
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from django.db.models import Q


from .models import Data

all_query_params = ['LATITUDE', 'LONGITUDE','FIRE_SIZE', 'FIRE_YEAR', 'DISCOVERY_DATE', 'DISCOVERY_DOY', 'DISCOVERY_TIME', 'CONT_DATE', 'CONT_DOY', 'CONT_TIME', 'STATE', 'COUNTY',
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
        requested_fields = {}
        # grab query params
        for p in all_query_params:
            # if we have a value for field as param
            # then add to requested_fields
            value = request.query_params.get(p,None)
            if value:
                requested_fields[p] = value

        # todo: handle gte, lte, etc. i.e, greater than x fire_size, discover date, after year, after time

        # always return values for latitude, longitude, and fire size to be able to map
        columns = list(requested_fields.keys())
        columns.append("LATITUDE")
        columns.append("LONGITUDE")
        # if no gte or lte or doesnt already exist, then append
        columns.append("FIRE_SIZE")

        # now construct queryset using requested_fields dictionary
        queryset = Data.objects.filter(**requested_fields).values(*columns)
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