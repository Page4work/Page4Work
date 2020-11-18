import json
from google.cloud import storage
import datetime
from werkzeug.exceptions import BadRequest
import os
import tempfile
import base64
import uuid
from werkzeug.utils import secure_filename

'''
download functions
'''
def download(request):
    if request.method == 'GET':
        data = request.args.get('file')
        if(data):
            return don_f(data)
        return ""

def don_f(filename):
    import tempfile
    from google.cloud import storage
    from flask import send_file
    client = storage.Client()
    bucket = client.get_bucket('imagepagi')
    blob = bucket.blob(filename)
    with tempfile.NamedTemporaryFile() as temp:
            blob.download_to_filename(temp.name)
            return send_file(temp.name, attachment_filename=filename)
    return "x"

'''
upload functions
'''

def upload(request):
    '''
    request["UploadFiles"] is base64 image
    return image name as string
    '''
    if request.method == 'POST':
        data = request.get_json(silent=True)
        
        # If an image was uploaded, update the data to point to the new image.
        # [START image_url]
        file = open(get_file_path('testfile.txt'),'wb+')
        file.write(base64.decodebytes(data['UploadFiles'].split(",")[1].encode('UTF-8')))
        file.close()
        image_url = upload_image_file(open(get_file_path('testfile.txt'),'rb+'),data['UploadFiles'].split(":")[1].split(";")[0])
        # [END image_url]
        
        # [START image_url2]
        if image_url:
            data['imageUrl'] = image_url
        # [END image_url2]
        return image_url

def get_file_path(filename):
    file_name = secure_filename(filename)
    return os.path.join(tempfile.gettempdir(), file_name)
def _check_extension(filename, allowed_extensions):
    if ('.' not in filename) or filename.split('.').pop().lower() not in allowed_extensions:
        #raise BadRequest(
        print("{0} has an invalid name or extension".format(filename))
            #)


def _safe_filename(filename):
    """
    Generates a safe filename that is unlikely to collide with existing objects
    in Google Cloud Storage.
    ``filename.ext`` is transformed into ``filename-YYYY-MM-DD-HHMMSS.ext``
    """
    filename = secure_filename(filename)
    date = datetime.datetime.utcnow().strftime("%Y-%m-%d-%H%M%S")
    basename, extension = filename.rsplit('.', 1)
    return "{0}-{1}.{2}".format(basename, date, extension)


# [START upload_file]
def upload_file(file_stream, filename, content_type):
    """
    Uploads a file to a given Cloud Storage bucket and returns the public url
    to the new object.
    """
    _check_extension(filename, ["jpg","png"])
    filename = _safe_filename(filename)

    client = storage.Client()
    bucket = client.get_bucket('imagepagi')
    blob = bucket.blob(filename)

    blob.upload_from_string(
        file_stream,
        content_type=content_type)

    url = blob.public_url

    return filename
# [END upload_file]
def upload_image_file(file,ty):
    """
    Upload the user-uploaded file to Google Cloud Storage and retrieve its
    publicly-accessible URL.
    """
    if not file:
        return None

    public_url = upload_file(
        file.read(),
        "".join([str(uuid.uuid4()),".",ty.split("/")[1]]),
        ty
    )

    return public_url
# [END upload_image_file]
