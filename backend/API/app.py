import json
import os
import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask_cors import CORS
from flask import Flask, jsonify, request, send_from_directory
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv 
from functools import wraps


