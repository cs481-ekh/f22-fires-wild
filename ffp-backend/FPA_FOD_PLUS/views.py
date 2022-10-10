from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import HeatMapSerializer, VariableListSerializer, DistinctYearsSerializer,DistinctStateSerializer, DistinctCountySerializer
from django.db.models import Q
from django.shortcuts import render


from .models import Data

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
    
@api_view(['GET'])
def distinct_counties_list(request):
    if request.method == 'GET':
        state = request.query_params.get('STATE')
        counties = Data.objects.filter(STATE=state).values('COUNTY').distinct()
        serializer = DistinctCountySerializer(counties, context={'request': request}, many=True)
        
        return Response(counties)

@api_view(['Get'])
def geojson_list(request):
    if request.method == 'GET':
        # queryset = Data.objects.filter(STATE='TX').values('STATE', 'LATITUDE', 'LONGITUDE')
        # serialized = json.dumps(list(queryset), cls=DjangoJSONEncoder)
        #return Response(serialize('geojson', Data.objects.filter(STATE='TX').values(), geometry_field='point', fields=('name',)))
        #return Response(serialize)
        fod_id = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('FOD_ID', flat=True)
        fire_name = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('FIRE_NAME', flat=True)
        fyear = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('DISCOVERY_DATE', flat=True)
        fcause = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('NWCG_GENERAL_CAUSE', flat=True)
        fcont = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('CONT_DATE', flat=True)
        fsize = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('FIRE_SIZE', flat=True)
        lat = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('LATITUDE', flat=True)
        long = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('LONGITUDE', flat=True)
        fstate = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('STATE', flat=True)
        fcounty = Data.objects.filter(STATE='ID').filter(FIRE_YEAR='2018').values_list('FIPS_NAME', flat=True)

        geo_json = [ {"type": "Feature",
                    "properties": {
                        "id":  ident,
                        "popupContent":  "id=%s" % (ident,),
                        "name":  fname,
                        "Discovery_Date": ffyear,
                        "Containment_Date": ffcont,
                        "Cause": ffcause,
                        "State": ffstate,
                        "County": ffcounty,
                        "Size": ffsize
                        },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [lon,lat] }}
                    for ident,fname,ffyear,ffcont,ffcause,ffstate,ffcounty,ffsize,lon,lat in zip(fod_id,fire_name,fyear,fcont,fcause,fstate,fcounty,fsize,long,lat) ]
        return Response(geo_json)
    
def administrator(request):
    return HttpResponse("Hello you are looking at the administrator page.")