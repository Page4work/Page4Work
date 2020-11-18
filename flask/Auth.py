import json
import time
import uuid
import hashlib
import functools
from flask import Flask, request
from def_values import headers
from help_func import valid


def login(request, db):
    output = {"token": "", "secsess": False}
    CollectionLogin = db.login
    CollectionUsers = db.users

    request_json = request.get_json(silent=True)
    user = valid(request_json, 'user')
    passw = valid(request_json, 'pass')

    if not (user or passw):
        output["reason"] = "no params"
        return (output, 200, headers)

    passw = passw+"pagiangular"
    passw = hashlib.md5(passw.encode()).hexdigest()

    Doc = CollectionUsers.find_one({"email": user, "pass_hash": passw})

    if Doc:
        T = uuid.uuid4().hex
        CollectionLogin.insert({"open": True, "ip": request.remote_addr, "user": Doc['id'], "tof": True, "time": str(
            time.time()), "token": T, "updatetoken": str(time.time())})
        output = {"token": str(T), "secsess": True}
        headers['set_cookie'] = '{0}={1}'.format("Token", str(T))
    else:
        CollectionLogin.insert({"open": False, "ip": request.remote_addr, "user": user, "tof": False, "time": str(
            time.time()), "token": passw, "updatetoken": str(time.time())})
    return (json.dumps(output), 200, headers)

def sign_up(request, db):
    request_json = request.get_json(silent=True)
    email = valid(request_json,"email")
    passw = valid(request_json,"pass")
    lname = valid(request_json,"lname")
    fname = valid(request_json,"fname")
    output = {"token":"","secsess":False}
    if not (email or passw or lname or fname):
        return (json.dumps(output),300,headers)

    CollectionUsers = db.users
    Doc = CollectionUsers.find_one({"email": email})
    if Doc:
        return (json.dumps(output),303,headers)

    newId = int(time.time())
    Doc = CollectionUsers.find_one({"id": newId})
    if Doc:
        return (json.dumps(output),200,headers)

    passw =  passw+"pagiangular"
    passw =  hashlib.md5(passw.encode()).hexdigest()
    CollectionUsers.insert({"email": email,"fname": fname, "lname": lname, "pass_hash":passw, "id":newId})
    return (json.dumps({"secsess":True}),200,headers)

def get_user(request,db):
    '''
    Token validation,
    get requset["user"] -> renew -> return user_id
    '''
    request_json = request.get_json(silent=True)
    user = valid(request_json, 'user')
    if not user:
        return None

    username = db.login.find_one({"token": user, "open": True})
    if not username:
        return None

    if float(username['updatetoken'])+3600 < float(time.time()):
        return None

    db.login.update_one({"token": user}, {'$set': {'updatetoken': str(time.time())}})
    user_id = username["user"]
    return db.users.find_one({"id": user_id})
