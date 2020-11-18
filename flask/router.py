from flask import Flask, request, render_template
import functools
import db
import Auth
from def_values import headers
app = Flask(__name__)


@app.route('/')
def hi():
    return render_template('index.html')


@app.route('/login', methods=['OPTIONS'])
@app.route('/getPages', methods=['OPTIONS'])
@app.route('/register', methods=['OPTIONS'])
@app.route('/getChepters', methods=['OPTIONS'])
@app.route('/getUnit', methods=['OPTIONS'])
@app.route('/editText', methods=['OPTIONS'])
@app.route('/newPage', methods=['OPTIONS'])
@app.route('/newUnit', methods=['OPTIONS'])
@app.route('/EditChepters', methods=['OPTIONS'])
@app.route('/getUnitTeacher', methods=['OPTIONS'])
@app.route('/getStudentsAns', methods=['OPTIONS'])
@app.route('/share', methods=['OPTIONS'])
@app.route('/joinPage', methods=['OPTIONS'])
@app.route('/getTeacherCode-1', methods=['OPTIONS'])
def loginaa():
    '''
    catch options requests, return policy.
    '''
    return ("", 200, headers)

@app.route('/login', methods=['POST','OPTIONS'])
def login():
    return Auth.login(request, db.db)


@app.route('/register', methods=['POST'])
def signup():
    return Auth.sign_up(request, db.db)


@app.route('/getPages', methods=['POST'])
def get_pages():
    from get_pages_units import pages as get_pages
    return login_required(get_pages, db.db, request)


@app.route('/getUnit', methods=['POST'])
def get_unit():
    from get_pages_units import units as get_units
    return login_required(get_units, db.db, request)


@app.route('/getChepters', methods=['POST'])
def get_chepters():
    from get_pages_units import chepters as get_chepters
    return login_required(get_chepters, db.db, request)


@app.route('/editText', methods=['POST'])
def edit_text():
    from edit_text import edit
    return login_required(edit, db.db, request)


@app.route('/newPage', methods=['POST'])
def new_page():
    from create_page import newpage
    return login_required(newpage, db.db, request)


@app.route('/newUnit', methods=['POST'])
def new_unit():
    from create_page import newunit
    return login_required(newunit, db.db, request)

@app.route('/EditChepters', methods=['POST'])
def edit_chepter():
    from create_page import editChepter
    return login_required(editChepter, db.db, request)

@app.route('/getUnitTeacher', methods=['POST'])
def get_t_unit():
    from teacher import getUnitTeacher
    return login_required(getUnitTeacher, db.db, request)
    
@app.route('/getStudentsAns', methods=['POST'])
def get_t_s_page():
    from teacher import getStudentsAns
    return login_required(getStudentsAns, db.db, request)

@app.route('/share', methods=['POST'])
def share_p():
    from share import share1
    return login_required(share1, db.db, request)

@app.route('/joinPage', methods=['POST'])
def join_p():
    from share import join
    return login_required(join, db.db, request)

@app.route('/getTeacherCode-1', methods=['POST'])
def createCode():
    from share import getTeacherCode
    return login_required(getTeacherCode, db.db, request)

@app.route('/upload-base64', methods=['POST'])
def upload_image():
    '''
    Actualy, Files save on google storage. In local version you can't put files there... 
    '''
    return ("Not work in local version", 404, headers)

@app.route('/download', methods=['GET'])
def download():
    '''
    Actualy, Files save on google storage. In local version you can't put files there... 
    '''
    return ("not work in local version", 404, headers)

def login_required(func, db, request):
    user = Auth.get_user(request, db)
    if user:
        return func(user, db, request)
    return ("you not login", 401, headers)

        
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)