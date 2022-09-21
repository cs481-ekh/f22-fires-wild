# syntax=docker/dockerfile:1
FROM python:3.10
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /ffp-backend
COPY requirements.txt /ffp-backend/
RUN pip install -r requirements.txt
COPY . /ffp-backend/