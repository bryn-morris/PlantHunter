#!/usr/bin/env python3

# Standard library imports


# Remote library imports
from flask import make_response, request, session, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import jwt

# Local imports
from config import app, db, api

from models import User, Observation, Plant

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
                print('Is this working?')
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
                    app.config['SECRET_KEY'],
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

        sub_user = request.get_json().get('username')
        sub_pass = request.get_json().get('password')

        sel_user = User.query.filter(User.username == sub_user).one_or_none()
        if sel_user == None or sel_user.authenticate(sub_pass) == False:
            return make_response({"error":"Please enter a valid username/password!"}, 401)
        else:
            token = jwt.encode(
                {
                    'user_id': sel_user.id},
                    app.config['SECRET_KEY'],
                    algorithm='HS256'
            )   
    
            response = make_response(
                sel_user.to_dict(
                   only = ('username','email') 
                ),
                201,
                {'Authorization': f'Bearer {token}'}
                )
            
            return response

    # check session in front end with useEffect, and store in state.
    # if that piece of state exists/not null, user is not logged in and
    # then we should route them to app
    # Otherwise, just consider them "logged in" and route them to the rest
    # of the website. If that piece of state is null or false, route them to
    # the login page. 

class Logout(Resource):
    
    def delete(self):
        session.pop('user_id', None)
        response = make_response({"message":"Log out Successful!"})
        return response

#May not even need to use this if using JSON Web Tokens
class CurrentSession(Resource):
    
    def get(self):

        if session['user_id'] is not None:
            
            sel_user = User.query.filter(User.id == session['user_id']).one()
            return make_response(
                sel_user.to_dict(
                    only = ('username','email')
                ),
                200
                )

        else:
            return make_response(
                {"error":"User not found! Please Sign In!"},
                404
            )
#######################################################
###########             Other Resources
#######################################################       
        


#######################################################
###########             API Resources
#######################################################

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CurrentSession, '/currentsession')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
