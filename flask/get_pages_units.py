import json
from def_values import headers
from help_func import valid
import time
output = {"secsess": False}


def pages(user, db, requests):
    user = str(user["id"])
    CollectionPages = db.pages
    CollectionHierarchy = db.hierarchy
    Res = []
    for Item in CollectionPages.find({"owner": int(user)}):
        Res.append(
            {"type": "owner", "title": Item["name"], "dec": Item["desc"], "id": Item["id"]})
    for Item in list(map(lambda Result: CollectionPages.find_one({"id": Result["page"]}), CollectionHierarchy.find({"student": int(user)}))):
        if Item:
            Res.append(
                {"type": "student", "title": Item["name"], "dec": Item["desc"], "id": Item["id"]})
    return (json.dumps(Res), 200, headers)


def units(user, db, requests):
    CollectionPages = db.pages
    CollectionHierarchy = db.hierarchy
    CollectionUnits = db.units
    CollectionRtext = db.rtext

    request_json = requests.get_json(silent=True)
    id = str(valid(request_json, 'id'))
    if not id:
        return (json.dumps(output), 400, headers)
    fin = False
    Res = []

    userId = str(user["id"])
    unitParts = CollectionUnits.find({"id": int(id)}).sort("order", 1)
    for Item in unitParts:
        if  (not CollectionHierarchy.find({"student": int(userId), "page": Item["page"]}).limit(1).count() and
                not CollectionPages.find({"owner": int(userId), "id": int(Item["page"])}).limit(1).count()):
            print(Item,userId,Item["page"], "why dont work?", CollectionPages.find({"owner": int(userId), "id": int(Item["page"])}).limit(1).count())
            return (json.dumps(output), 400, headers)
        if Item['status'] == 'private' and Item['editable']:
            nit = CollectionRtext.find(
                {"id": Item['objectId'], "owner": userId}).sort("time", -1).limit(1)
            if nit.count() < 1:
                CollectionRtext.insert({"id": Item['objectId'], "owner": userId, "time": time.time(
                ), "ip": requests.remote_addr, "editBy": userId, "data": "fil your anwer"})
                nit = CollectionRtext.find(
                    {"id": Item['objectId'], "owner": userId}).sort("time", -1).limit(1)
            nit = nit[0]
            if "fin" in nit and nit["fin"]:
                fin = True
            else:
                fin = False
            Res.append({"id": nit["id"], "data": nit['data'], "editable": True,
                        "type": "private", "order": Item['order'], "fin": fin})

        if Item['status'] == 'public' and not Item['editable']:
            nit = CollectionRtext.find(
                {"id": Item['objectId']}).sort("time", -1).limit(1)[0]
            if nit:
                Res.append({"id": nit["id"], "data": nit['data'],
                            "editable": False, "type": "public", "order": Item['order']})

        if Item['status'] == 'private' and not Item['editable']:
            nit = CollectionRtext.find(
                {"id": Item['objectId'], "owner": userId}).sort("time", -1).limit(1)
            if nit.count():
                nit = nit[0]
                if 'points' in nit:
                    points = nit['points']
                else:
                    points = -2
                Res.append({"id": nit["id"], "data": nit['data'], "editable": False,
                            "type": "private", "order": Item['order'], "grades": points})
            else:
                Res.append({"id": Item['objectId'], "data": "stil not check",
                            "editable": False, "type": "private", "order": Item['order'], "grades": -1})
    return (json.dumps(Res), 200, headers)


def chepters(user, db, requests):
    CollectionPages = db.pages
    CollectionHierarchy = db.hierarchy
    Res = []
    userId = str(user["id"])
    request_json = requests.get_json(silent=True)
    id = valid(request_json, 'id')
    if not id:
        return (json.dumps(output), 400, headers)
    page = CollectionPages.find_one({"id": int(id)})
    if not page:
        return (json.dumps(output), 404, headers)
    if page["owner"] == int(userId) or CollectionHierarchy.find({"student": int(userId)}).limit(1).count():
        Res = page["sections"]
    return (json.dumps(Res), 200, headers)
