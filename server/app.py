#!/usr/bin/env python3

# Standard library imports


# Remote library imports
from flask import make_response, request, session, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import jwt
import os
from jwt.exceptions import DecodeError, InvalidTokenError, InvalidSignatureError

# Local imports
from config import app, db, api
from models import User, Observation, Plant

#Super Secret Key, no looking pls
# Move to somewhere more secure on refactor
# likely store within app context to import over here
SECRET_KEY = os.urandom(16)

#######################################################
###########        Authentication Wrapper
#######################################################

def JWT_Authentication_Decorator(func):

    def wrapper_func(*args, **kwargs):
        
        decoded_token = request.headers.get('Authorization').split(' ')[1]
        try:
            jwt.decode(
                jwt = decoded_token,
                key = SECRET_KEY,
                algorithms = ['HS256'],
            )
        except:
            return make_response({"error": "Authentication failed - Token Error"},401)

        return func(*args, **kwargs)

    return wrapper_func

#######################################################
###########        Login & Authentication
#######################################################


class Signup(Resource):
    
    def post(self):

        user_attr = ["username", "password", "email"]
        user_obj = {}

        for attr in user_attr:
            user_obj[attr] = request.get_json()[attr]
            
        try:
            newUser = User( 
                    username = user_obj[f'{user_attr[0]}'],
                    password_hash = user_obj[f'{user_attr[1]}'],
                    email = user_obj[f'{user_attr[2]}'],
                    )
        except ValueError as e:
                return make_response({"Value Error": f"{e}"}, 400)
        
        try:
            db.session.add(newUser)
            db.session.commit()       
        except IntegrityError:
            db.session.rollback()
            return make_response({
                    "Integrity Error": "This username is not unique. Please try again!"
                }, 400)

        db_user = User.query.filter(User.username == user_obj[f'{user_attr[0]}']).one()
        token = jwt.encode(
                {
                    'user_id': db_user.id},
                    SECRET_KEY,
                    algorithm='HS256'
            )   

        response = make_response(
            newUser.to_dict(
                only = ('username', 'email')
            ),
            201,
            {'Authorization': f'Bearer {token}'}
            )

        return response    

class Login(Resource):

    def post(self):

        sub_user = request.get_json().get('username').lower()
        sub_pass = request.get_json().get('password')

        sel_user = User.query.filter(User.username == sub_user).one_or_none()
        if sel_user == None or sel_user.authenticate(sub_pass) == False:
            return make_response({"error":"Please enter a valid username/password!"}, 401)
        else:
            token = jwt.encode(
                {
                    'user_id': sel_user.id},
                    key = SECRET_KEY,
                    algorithm = 'HS256'
            )   
    
            response = make_response(
                sel_user.to_dict(
                   only = ('username','email') 
                ),
                201,
                {'Authorization': f'Bearer {token}'}
                )
            
            return response

#######################################################
###########             Other Resources
#######################################################       


class Plants_by_User(Resource):
    @JWT_Authentication_Decorator
    def get(self):
        
        decoded_token = request.headers.get('Authorization').split(' ')[1]
        
        user_id = jwt.decode(
                            jwt = decoded_token,
                            key = SECRET_KEY,
                            algorithms = ['HS256'],
                          )['user_id']
        
        sel_users_plants = User.query.filter(User.id == user_id).one().plants

        user_plants =   [pl.to_dict(
                            rules = (
                                        'observations.comment',
                                        'observations.id',
                                        '-observations.plant',
                                        '-observations.user._password_hash',
                                        '-observations.user.email',
                                        '-observations.user.id',
                                        '-observations.user_id',
                                        '-observations.plant_id',
                                    )) for pl in sel_users_plants]
            
        return make_response(
            user_plants, 200)

#possible refactor for non restful so sel_plant only take one space
# in memory
# 
         
class Plant_by_id(Resource):
    @JWT_Authentication_Decorator
    def patch(self, id):
        try: 
            sel_plant = Plant.query.filter(Plant.id == id).one()
        except:
            return make_response({"error":"Entry Not Found!"},404)

        for attr in request.get_json():
            setattr(sel_plant, attr, request.get_json()[attr])
        
        db.session.add(sel_plant)
        db.session.commit()

        return make_response(sel_plant.to_dict(
            rules = (
                    'observations.comment',
                    '-observations.plant',
                    '-observations.user._password_hash',
                    '-observations.user.email',
                    '-observations.user.id',
                    '-observations.user_id',
                    '-observations.plant_id',
            )
        ), 200)
    @JWT_Authentication_Decorator
    def delete(self, id):

        sel_plant = Plant.query.filter(Plant.id == id).one()

        db.session.delete(sel_plant)
        db.session.commit()

        return make_response({}, 204)
    
class Observations_by_User(Resource):

    @JWT_Authentication_Decorator
    def get(self):

        decoded_token = request.headers.get('Authorization').split(' ')[1]
        
        user_id = jwt.decode(
            jwt = decoded_token,
            key = SECRET_KEY,
            algorithms = ['HS256'],
        )['user_id']

        sel_Observations = Observation.query.filter(Observation.user_id == user_id).all()

        response = [o.to_dict(
            only = ('image',)
        ) for o in sel_Observations]

        return make_response(response, 200)
    
#######################################################
###########             API Resources
#######################################################

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Observations_by_User, '/observationsbyuser')
api.add_resource(Plant_by_id, '/plantsbyuser/<int:id>')
api.add_resource(Plants_by_User, '/plantsbyuser')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
