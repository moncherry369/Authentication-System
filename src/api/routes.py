"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
    print("body:", request.json)

    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({
            "msg": "No account was found. Please check the email used or create an account."
        }), 401
    
    if password != user.password:
        return jsonify({"msg": "Incorrect password. Please try again."}), 401

    access_token = create_access_token(identity=username)
    
    payload = {
        "token": access_token,
        'msg': 'Login Successful.',
        "user": user.serialize()
    }
    return jsonify(payload), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    print("body:", request.json)

    body = request.json 
    username = body.get('username', None)
    password = body.get('password', None)
    
    if body is None:
        return "The request body is null", 400
    if not username:
        return 'You need to enter an email',400
    if not password:
        return 'You need to enter a password', 400

    check_user = User.query.filter_by(username=username).first()

    if check_user is not None:
        return jsonify({
            'msg': 'The user address already exists. Please login to your account to continue.'
        }), 409

    user = User(username=username, password=password, is_active=True)

    # try:
    db.session.merge(user)
    db.session.commit()
    access_token = create_access_token(identity=user.username)
    refresh_token = create_refresh_token(identity=user.username)
    return jsonify({
        'msg': 'User created successfully.',
        'access_token': access_token,
        'refresh_token': refresh_token
        }), 201