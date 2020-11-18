import json
import time
from def_values import headers
from help_func import valid

def img(request):
    import upload_base64
    return upload_base64.webhook(request)

def edit(user,db,request):
    CollectionPages = db.pages
    CollectionHierarchy = db.hierarchy
    CollectionUnits = db.units
    CollectionRtext = db.rtext

    request_json = request.get_json(silent=True)
    userId = int(user["id"])
    id = valid(request_json,"id")
    text = valid(request_json,"text")
    fin = valid(request_json,"fin")
    if not fin:
        fin = True
    grade = valid(request_json,"points")
    student = int(valid(request_json,"student"))
    output = {"secsess":False}
    
    #Res.append({"id": 2})
    unitParts = CollectionUnits.find_one({"objectId":int(id)})
    if not unitParts:
        return ("no unit",500,headers)
        #Res.append({"id": 3})
    if CollectionHierarchy.find({"student":userId,"page":unitParts["page"]}).limit(1).count():
        #Res.append({"id": 4})
        if unitParts['status'] == 'private' and unitParts['editable']:
            #Res.append({"id": 5})
            str(CollectionRtext.insert({"id": unitParts['objectId'],"owner": userId,"time": time.time(),"ip": request.remote_addr,"editBy": userId,"data": text,"fin":fin}))
            output = {"secsess":True}
    if unitParts['status'] == 'public' and not unitParts['editable']:
        if CollectionPages.find({"id":unitParts["page"],"owner":userId}).limit(1).count():
            str(CollectionRtext.insert({"id": unitParts['objectId'],"owner": userId,"time": time.time(),"ip": request.remote_addr,"editBy": userId,"data": text}))
            output = {"secsess":True}
    if student and CollectionHierarchy.find({"student":student,"teacher":userId,"page":unitParts["page"]}).limit(1).count():
        if unitParts['status'] == 'private' and not unitParts['editable']:
            str(CollectionRtext.insert({"id": unitParts['objectId'],"owner": student,"time": time.time(),"ip": request.remote_addr,"editBy": userId,"data": text,"points":grade,"fin":fin,"seen":False}))
            output = {"secsess":True}

    return (json.dumps(output),200,headers)
