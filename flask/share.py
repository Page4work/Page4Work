import json
from def_values import headers
from help_func import valid
import time
import uuid
output = {"secess":False}

def getTeacherCode(user, db, requests):
    CollectionPages = db.pages
    CollectionHierarchy = db.hierarchy

    request_json = requests.get_json(silent=True)
    page = valid(request_json, 'page')
    userId = user = int(user["id"])

    code = ""
    
    Res = []

    if not (userId and page.isdigit()):
        return  (json.dumps(Res),400,headers)
    page = int(page)
    listJoin = CollectionHierarchy.find_one({"page": page,"teacher": userId})
    listJoin2 = CollectionHierarchy.find_one({"page": page,"student": userId})
    listJoin3 = CollectionPages.find_one({"id": page,"owner": userId})
    if listJoin:
        Res.append({"teacher":userId,"page":listJoin["page"],"code":listJoin["contact"],"done":False})
        return (json.dumps(Res),200,headers)
    if not listJoin2 and not listJoin3:
        Res.append({"done":False})
        return (json.dumps(Res),200,headers)

    code = uuid.uuid4().hex[:6]
    listJoin = CollectionHierarchy.find_one({"contact": code},projection={'_id': False})
    if not listJoin:
        CollectionHierarchy.insert({"strat_time": time.time(),"end_time": time.time(),"teacher": userId,
            "student": 1,"page": page,"contact": code})
        Res.append({"done":True})
    return (json.dumps(Res),200,headers)


def join(user, db, requests):
    CollectionHierarchy = db.hierarchy


    request_json = requests.get_json(silent=True)
    code = valid(request_json, 'code')
    viewOnly = valid(request_json, 'viewOnly')
    user = int(user["id"])
    viewOnly = False
    
    Res = []

    userId = user
    if not(len(code) == 6):
        return (json.dumps(["THe code must be 6 chars"]),400,headers)

    listJoin = CollectionHierarchy.find_one({"contact": code,"student": userId})
    if listJoin:
        Res.append({"student":listJoin["student"],"page":listJoin["page"],"teacher":listJoin["teacher"],"done":False})
        return (json.dumps(Res),200,headers)
    
    listJoin = CollectionHierarchy.find_one({"contact": code},projection={'_id': False})
    if viewOnly:
        Res.append({"page":listJoin["page"],"teacher":listJoin["teacher"],"done":False})
        return (json.dumps(Res),200,headers)
    if listJoin["teacher"]==userId:
        return (json.dumps(["You cant be self student"]),400,headers)
    if listJoin:
        listJoin["student"] = userId
        listJoin["ip"] = requests.environ['REMOTE_ADDR']
        str(CollectionHierarchy.insert(listJoin))
        Res.append({"student":listJoin["student"],"page":listJoin["page"],"teacher":listJoin["teacher"],"done":True})
    return (json.dumps(Res),200,headers)

def share1(user, db, requests):

    CollectionHierarchy = db.hierarchy
    CollectionUsers = db.users

    request_json = requests.get_json(silent=True)
    id = int(valid(request_json, 'id'))
    user = int(user["id"])

    Res = []
    userDetiles = {}

    userId = user
    if not user:
        return (json.dumps(output),400,headers)
    userList = CollectionHierarchy.find({"teacher":userId,"page":id})
    for Stu in userList:
        userDetiles = CollectionUsers.find_one({"id":Stu["student"]})
        if Stu["student"] == 1:
            Res.append({"student":Stu["contact"],"studenfName":Stu["contact"],"studenlName":Stu["contact"],"strat_time":Stu["strat_time"],"end_time":Stu["end_time"],"teacher": Stu["teacher"],"page":Stu["page"], "contact":Stu["contact"]})
        if userDetiles:
            Res.append({"student":Stu["student"],"studenfName":userDetiles["fname"],"studenlName":userDetiles["lname"],"strat_time":Stu["strat_time"],"end_time":Stu["end_time"],"teacher": Stu["teacher"],"page":Stu["page"], "contact":Stu["contact"]})
    return (json.dumps(Res),200,headers)