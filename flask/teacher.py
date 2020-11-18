import json
from def_values import headers
from help_func import valid
import time
output = {"secess":False}
def getUnitTeacher(user, db, requests):
    user = int(user["id"])
    CollectionHierarchy = db.hierarchy
    CollectionRtext = db.rtext
    CollectionUnits = db.units
    request_json = requests.get_json(silent=True)
    id = int(valid(request_json, 'id'))
    if not id and id!=0:
        return (json.dumps(["not id"]), 400, headers)
    unitRes = CollectionUnits.find({"id":id})
    if not unitRes.count():
        return (json.dumps(["unitRes.count() empty"]), 400, headers)
    out = []
    for unit in unitRes:
        students = CollectionHierarchy.find({"teacher": user,"page":unit["page"]})
        if not (unit["status"] == "private" and unit["editable"]):
            continue
        for student in students:
            res = CollectionRtext.find({"id": unit['objectId'], "owner": student["student"]}).sort("time", -1).limit(1)
            #user = CollectionUsers.find_one({"id":student["student"]})
            user = ""
            if not user:
                user = {"fname":"not","lname":"not"}
            versions = res.count()
            if res.count():
                res = res[0]
                out += [{"StudentName": (user["lname"]+" "+user["fname"]),"data": str(res["data"]),"editable": True,"fin":res["fin"],"id": unit['objectId'],
                "order": 1,"student": student["student"], "type": "private","edits":versions}]
    return (json.dumps(out), 200, headers)

def getStudentsAns(user, db, requests):
    user = int(user["id"])
    CollectionHierarchy = db.hierarchy
    CollectionRtext = db.rtext
    CollectionUnits = db.units
    CollectionUsers = db.users
    request_json = requests.get_json(silent=True)
    idpage = int(valid(request_json, 'id'))
    studentid = int(valid(request_json, 'studentid'))
    if not id:
        return (json.dumps(output), 400, headers)
    unitRes = CollectionUnits.find({"page":idpage})
    if not unitRes.count():
        return (json.dumps(output), 400, headers)
    out = []
    for unit in unitRes:
        students = CollectionHierarchy.find({"teacher": user,"page":unit["page"],"student":studentid})
        if not (unit["status"] == "private" and unit["editable"]):
            continue
        for student in students:
            res = CollectionRtext.find({"id": unit['objectId'], "owner": student["student"]}).sort("time", -1).limit(1)
            user = CollectionUsers.find_one({"id":student["student"]})
            if not user:
                user = {"fname":"not","lname":"not"}
            versions = res.count()
            if res.count():
                res = res[0]
                out += [{"StudentName": (user["lname"]+" "+user["fname"]),"data": str(res["data"]),"editable": True,"fin":res["fin"],"id": unit['objectId'],
                "order": 1,"student": student["student"], "type": "private","edits":versions}]
    return (json.dumps(out), 200, headers)

