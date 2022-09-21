from django.http import HttpResponse

from .models import Data

def index(request):
    
    return HttpResponse("Hello, world. You're at the FPA-FOD-Plus index page.")
    
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