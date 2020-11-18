FROM python:3.6
ADD /flask /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN pip install --upgrade google-cloud-storage
