from def_values import headers
from help_func import valid
import json, time

def newpage(user,db,requests):
    CollectionPages = db.pages
    request_json = requests.get_json(silent=True)
    user = str(user["id"])
    name = valid(request_json,"name")
    desc = valid(request_json,"desc")
    
    Res = []
    if not(user or name):
        return ("",300,headers)

    userId = user

    HighV = CollectionPages.find().sort( "id", -1 ).limit(1)
    if not HighV.count():
        HighV = 100
    else:
        HighV = HighV[0]["id"]
        HighV = int(HighV) + 1
    CollectionPages.insert({"id": HighV,"owner": int(userId),"name": name,"desc": desc,"sections": []})
    Res = {"newPage": HighV}

    return (json.dumps(Res),200,headers)

def newunit(user,db,requests):
    CollectionPages = db.pages
    CollectionUnits = db.units
    CollectionRtext = db.rtext

    request_json = requests.get_json(silent=True)
    userId = int(user["id"])
    id = valid(request_json,"id")
    unitnum = valid(request_json,"unitnum")
    type = valid(request_json,"type")
    
    Res = []

    if not(userId or id):
        return ("pro1",300,headers)
    page = CollectionPages.find_one({"id":int(id)})
    if not page:
        return ("pro2",300,headers)
    if int(page["owner"]) != userId:
        return ('pro3',300,headers)
    try:
        int(type)
    except:
        return ("pro4",300,headers)
    if not unitnum: 
        HighV = CollectionUnits.find().sort( "id", -1 ).limit(1)
        if not HighV.count():
            HighV = 1000
        else:
            HighV = HighV[0]["id"]
            HighV = int(HighV) + 1
    else:
        HighV = int(unitnum)
    newPart(int(type),userId,CollectionRtext,CollectionUnits,HighV,id)
    Res = {"newUnit": HighV}
    return (json.dumps(Res),200,headers)

def newPart(type,owner,CollectionRtext,CollectionUnits,HighV,id):
    HighT = CollectionRtext.find().sort( "id", -1 ).limit(1)
    if not HighT.count():
        HighT = 10000
    else:
        HighT = HighT[0]["id"]
        HighT = int(HighT) + 1
    if type==0:
        str(CollectionUnits.insert({"id": HighV,"page": int(id),"order": 1,"points": 25,"editable": True,"status": "private","type": "rtext","objectId": HighT}))
        str(CollectionRtext.insert({"id": HighT,"owner": owner,"time": time.time(),"ip": 25,"editBy": owner,"data": "<p style='direction: rtl; text-align: right;'>your answer</p>"}))
    if type==1:
        str(CollectionUnits.insert({"id": HighV,"page": int(id),"order": 1,"points": 0,"editable": False,"status": "public","type": "rtext","objectId": HighT}))
        str(CollectionRtext.insert({"id": HighT,"owner": owner,"time": time.time(),"ip": 25,"editBy": owner,"data": "<p style='direction: rtl; text-align: right;'>your question</p>","fin":False}))
    if type==2:
        str(CollectionUnits.insert({"id": HighV,"page": int(id),"order": 1,"points": 25,"editable": False,"status": "private","type": "rtext","objectId": HighT}))
        str(CollectionRtext.insert({"id": HighT,"owner": owner,"time": time.time(),"ip": 25,"editBy": owner,"data": "<p style='direction: rtl; text-align: right;'></p>","grade":-1,"seen":False}))
    return HighT

def editChepter(user,db,requests):
    '''
    For empty input return all units in page
    Can take arr of chapters and save it to page
    '''
    CollectionPages = db.pages
    CollectionUnits = db.units
    request_json = requests.get_json(silent=True)
    id = valid(request_json,"id")
    newSec = valid(request_json,"newSec")
    page = CollectionPages.find_one({"id":int(id)})
    if not page:
        return ("pro",300,headers)
    if not str(page["owner"]) == str(user["id"]):
        return ("pro",300,headers)
    Res=[item["id"] for item in CollectionUnits.find({"page":int(id)})]
    if not isinstance(newSec, list):
        return (json.dumps(Res),200,headers)
    for x in newSec:
        if not isinstance(x, list):
            return ("type not good",400,headers)
        for y in x:
            if isinstance(y, int) and y in Res:
                continue
            else:
                return ("type not good",400,headers)
    CollectionPages.update_one({"id": int(id)}, {'$set':{'sections': newSec}})
    return (json.dumps(newSec),200,headers)